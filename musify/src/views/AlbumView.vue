<template>
  <v-container class="container">
    <v-row> <h3 class="header">Songs</h3></v-row>
    <v-row class="row rounded-lg">
      <section class="songs">
        <v-list lines="one" class="list">
          <SongItemAlbum v-for="item in songs" :key="item.id" :song="item">
          </SongItemAlbum>
          <div v-intersect="onIntersect"></div>
        </v-list>
      </section>
    </v-row>
  </v-container>
</template>
<script>
import SongItemAlbum from "@/components/SongItemAlbum";
import { getAllSongsInAlbum } from "@/services/AlbumService";

export default {
  data() {
    return {
      songs: [],
    };
  },

  methods: {
    getSongs() {
      getAllSongsInAlbum(this.$route.params.id).then((res) => {
        this.songs = res.tracks.data;
      });
    },
  },

  components: {
    SongItemAlbum,
  },

  mounted() {
    this.getSongs();
  },
};
</script>
<style scoped>
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
.album_img {
  height: 150px;
  width: 150px;
}
</style>
