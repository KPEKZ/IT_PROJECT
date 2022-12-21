<template>
  <v-container class="container">
    <template v-if="getSongs?.length !== 0 && getSongs">
      <v-row class="row"> <h3 class="header">Albums</h3></v-row>
      <v-row class="row row__theme-default rounded-lg">
        <AlbumsList :albums="getAlbums" :canAddToLibrary="true"></AlbumsList>
      </v-row>
      <v-row class="row"> <h3 class="header">Artists</h3></v-row>
      <v-row class="row row__theme-default rounded-lg">
        <section class="songs">
          <ArtistsList
            :artists="getArtists"
            :canAddToLibrary="true"
          ></ArtistsList>
        </section>
      </v-row>
      <v-row class="row"> <h3 class="header">Songs</h3></v-row>
      <v-row class="row row__theme-default rounded-lg">
        <section class="songs">
          <SongsList
            class="songs-list"
            :songs="getSongs"
            location="home"
            :canAddToLibrary="true"
          ></SongsList>
        </section>
      </v-row>
    </template>
    <template v-if="getSongsIsLoading">
      <ClipLoader
        class="loader"
        :loading="getSongsIsLoading"
        color="#fe7e91"
        size="100px"
      ></ClipLoader>
      <h3 class="loader-text">Loading...</h3>
    </template>
  </v-container>
</template>

<script>
import SongsList from "@/components/SongsList";
import AlbumsList from "@/components/AlbumsList";
import ArtistsList from "@/components/ArtistsList";
import ClipLoader from "vue-spinner/src/ClipLoader";

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
    ClipLoader,
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

    getSongsIsLoading() {
      return this.$store.getters.getSongsIsLoading;
    },

    getErrorLoad() {
      return this.$store.getters.getErrorLoad;
    },
  },

  watch: {
    getErrorLoad(error) {
      if (error) {
        setTimeout(() => {
          this.$store.dispatch("fetchRandomWord");
          this.$store.dispatch("fetchInitHomeSongs", this.randomWord);
        }, 2500);
      }
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
.row {
  margin: 0;
}

.row__theme-default {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
}

.header {
  color: #69686f;
}

.songs {
  width: 100%;
}

.songs-list {
  height: 600px;
}

.container {
  display: flex;
  gap: 20px;
  flex-flow: column;
  padding: 50px 0 50px 0;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loader-text {
  position: absolute;
  left: 50%;
  top: 57%;
  transform: translate(-50%, -57%);
}
</style>
