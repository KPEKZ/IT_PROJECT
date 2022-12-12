<template>
  <v-container class="container">
    <v-row> <h3 class="header">Albums</h3></v-row>
    <v-row class="row rounded-lg">
      <AlbumsList :albums="getAlbums"></AlbumsList>
    </v-row>
    <v-row> <h3 class="header">Artists</h3></v-row>
    <v-row class="row rounded-lg">
      <section class="songs">
        <ArtistsList :artists="artists"></ArtistsList>
      </section>
    </v-row>
    <v-row> <h3 class="header">Songs</h3></v-row>
    <v-row class="row rounded-lg">
      <section class="songs">
        <SongsList :songs="songs"></SongsList>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import _debounce from "lodash/debounce";
import SongsList from "@/components/SongsList";
import AlbumsList from "@/components/AlbumsList";
import ArtistsList from "@/components/ArtistsList";

export default {
  name: "LibraryView",
  data() {
    return {
      albums: [],
      songs: [],
      artists: [],
      randomWord: "",
    };
  },

  components: {
    SongsList,
    AlbumsList,
    ArtistsList,
  },
  computed: {
    getSongs() {
      return this.$store.getters.getHomeSongs;
    },

    getAlbums() {
      return this.$store.getters.getHomeAlbums;
    },

    getArtists() {
      return this.$store.getters.getHomeArtists;
    },
  },
  methods: {
    updateQuery(value) {
      this.updateValueWithDelay(value);
    },

    updateValueWithDelay: _debounce(function (value) {
      this.$store.dispatch("fetchInitHomeSongs", value);
      this.songs = this.$store.getters.getHomeSongs;
      this.albums = this.$store.getters.getHomeAlbums;
      this.artists = this.$store.getters.getHomeArtists;
    }, 500),
  },

  watch: {
    getSongs: function (newSongs) {
      this.songs = newSongs;
    },

    getAlbums: function (newAlbums) {
      this.albums = newAlbums;
    },

    getArtists: function (newArtists) {
      this.artists = newArtists;
    },
  },

  mounted() {
    this.$store.dispatch("fetchRandomWord");
    this.randomWord = this.$store.getters.getRandomWord;
    this.updateQuery(this.randomWord);
    this.albums = this.$store.getters.getHomeAlbums;
    this.songs = this.$store.getters.getHomeSongs;
    this.artists = this.$store.getters.getHomeArtists;
  },
};
</script>

<style scoped>
.albums {
  display: flex;
  overflow: auto;
  gap: 20px;
}

.row {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
  margin: 0;
}

.header {
  color: #69686f;
  margin-left: 70px;
  margin-top: 20px;
}

.songs {
  width: 100%;
}

.container {
  display: flex;
  gap: 20px;
  flex-flow: column;
  padding: 50px 0 50px 0;
}
</style>
