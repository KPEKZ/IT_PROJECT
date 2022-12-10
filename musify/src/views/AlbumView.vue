<template>
  <v-container class="container">
    <v-card max-width="300">
      <v-img
        :src="this.songs[0]?.album.cover_big"
        height="300px"
        cover
        class="align-end text-white"
      >
        <v-card-title class="title_text" v-text="this.songs[0]?.album.title">
        </v-card-title>
        <v-card-title
          class="title_text"
          v-text="this.songs[0]?.artist.name + ', tracks: ' + this.songs.length"
        >
        </v-card-title>
      </v-img>
    </v-card>
    <v-row> <h3 class="header">Songs</h3></v-row>
    <v-row class="row rounded-lg">
      <section class="songs">
        <SongsList
          v-if="songs"
          class="list__song"
          :songs="songs"
          :canAddToLibrary="true"
        >
        </SongsList>
        <div v-intersect="onIntersect"></div>
      </section>
    </v-row>
  </v-container>
</template>
<script>
import { getAllSongsInAlbum } from "@/services/AlbumService";
import SongsList from "@/components/SongsList";

export default {
  data() {
    return {
      songs: [],
    };
  },

  methods: {
    getSongs() {
      getAllSongsInAlbum(this.$route.params.id).then((res) => {
        const artistPicture = res.artist?.picture;
        const tracks = res?.tracks?.data;
        this.songs = tracks.map((track) => {
          const newTrack = { ...track };
          track.artist.picture = artistPicture;
          return newTrack;
        });
      });
    },
  },

  components: {
    SongsList,
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
.title_text {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
