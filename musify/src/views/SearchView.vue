<template>
  <v-container class="container">
    <v-text-field
      label="Search your favorite song..."
      type="text"
      @input="updateQuery"
      v-model="query"
      variant="outlined"
    >
      <template v-slot:append-inner>
        <v-icon icon="mdi-magnify"></v-icon>
      </template>
    </v-text-field>
    <template v-if="getSongs?.length !== 0">
      <v-row class="row"> <h3 class="header">Songs</h3></v-row>
      <v-row class="row rounded-lg row__theme-default songs">
        <SongsList
          @load-next-songs="loadNextSongs"
          v-if="songs"
          class="list__song"
          :songs="getSongs"
          :canAddToLibrary="true"
          location="search"
        ></SongsList>
      </v-row>
      <v-row class="row"> <h3 class="header">Albums</h3></v-row>
      <v-row class="row rounded-lg row__theme-default">
        <AlbumsList :albums="getAlbums"></AlbumsList>
      </v-row>
      <v-row class="row"> <h3 class="header">Artists</h3></v-row>
      <v-row class="row rounded-lg row__theme-default">
        <ArtistsList :artists="artists"></ArtistsList>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import _debounce from "lodash/debounce";
import SongsList from "@/components/SongsList";
import AlbumsList from "@/components/AlbumsList";
import ArtistsList from "@/components/ArtistsList";

export default {
  name: "SearchView",

  data() {
    return {
      query: null,
      songs: [],
      albums: [],
      artists: [],
      nextSongs: undefined,
    };
  },

  components: {
    SongsList,
    AlbumsList,
    ArtistsList,
  },

  computed: {
    getSongs() {
      return this.$store.getters.getSongs;
    },

    getArtists() {
      return this.$store.getters.getArtists;
    },

    getAlbums() {
      return this.$store.getters.getAlbums;
    },
    getNextSongs() {
      return this.$store.getters.getNextSongs;
    },
  },

  watch: {
    getSongs: function (newSongs) {
      this.songs = newSongs;
    },
    getArtists: function (newArtists) {
      this.artists = newArtists;
    },

    getAlbums: function (newAlbums) {
      this.albums = newAlbums;
    },
    getNextSongs: function (newNextSongs) {
      this.nextSongs = newNextSongs;
    },
  },

  methods: {
    updateQuery(event) {
      this.updateValueWithDelay(event.target.value);
    },

    updateValueWithDelay: _debounce(function (value) {
      this.$emit("input", value);
      this.$store.dispatch("fetchInitSongs", value);
      this.songs = this.$store.getters.getSongs;
      this.albums = this.$store.getters.getAlbums;
      this.artists = this.$store.getters.getArtists;
    }, 500),

    loadNextSongs() {
      if (this.getNextSongs > 0) {
        console.log(this.getNextSongs, this.query);
        this.$store.dispatch("fetchNextSongs", this.query);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}

.row {
  margin: 0;
}

.row__theme-default {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
}

.songs {
  height: 400px;
}

.header {
  color: #69686f;
}
</style>
