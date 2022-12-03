<template>
  <v-container class="container">
    <v-row> <h3 class="header">Albums</h3></v-row>
    <v-row class="row rounded-lg">
      <AlbumsList :albums="getAlbums"></AlbumsList>
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
import SongsList from "@/components/SongsList";
import AlbumsList from "@/components/AlbumsList";

export default {
  name: "LibraryView",
  data() {
    return {
      albums: [],
      songs: [],
    };
  },

  components: {
    SongsList,
    AlbumsList,
  },
  computed: {
    getSongs() {
      return this.$store.getters.getSongs;
    },

    getAlbums() {
      return this.$store.getters.getAlbums;
    },
  },
  methods: {},

  watch: {
    getAlbums: function (newAlbums) {
      this.albums = newAlbums;
    },
  },

  mounted() {
    this.albums = this.$store.getters.getAlbums;
    this.songs = this.$store.getters.getSongs;
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
