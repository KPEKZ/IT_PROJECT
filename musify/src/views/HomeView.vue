<template>
  <v-container class="container">
    <template v-if="getSongs?.length !== 0 && getSongs">
      <v-row> <h3 class="header">Albums</h3></v-row>
      <v-row class="row rounded-lg">
        <AlbumsList :albums="getAlbums"></AlbumsList>
      </v-row>
      <v-row> <h3 class="header">Artists</h3></v-row>
      <v-row class="row rounded-lg">
        <section class="songs">
          <ArtistsList :artists="getArtists"></ArtistsList>
        </section>
      </v-row>
      <v-row> <h3 class="header">Songs</h3></v-row>
      <v-row class="row rounded-lg">
        <section class="songs">
          <SongsList
            :songs="getSongs"
            location="home"
            :canAddToLibrary="true"
          ></SongsList>
        </section>
      </v-row>
    </template>
  </v-container>
</template>

<script>
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

  mounted() {
    this.$store.dispatch("fetchRandomWord");
    this.randomWord = this.$store.getters.getRandomWord;
    this.$store.dispatch("fetchInitHomeSongs", this.randomWord);
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
