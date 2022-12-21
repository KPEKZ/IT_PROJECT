<template>
  <v-container v-if="songs && songs.length !== 0" class="container">
    <v-row class="row justify-center">
      <v-card max-width="300">
        <v-img
          :src="songs[0]?.album.cover_big"
          height="300px"
          width="300px"
          cover
          class="align-end text-white"
        >
          <v-card-title class="title_text" v-text="songs[0]?.album.title">
          </v-card-title>
          <v-card-title
            class="title_text"
            v-text="songs[0]?.artist.name + ', tracks: ' + songs.length"
          >
          </v-card-title>
        </v-img>
      </v-card>
    </v-row>
    <v-row> <h3 class="header">Songs</h3></v-row>
    <v-row class="row row__theme_default rounded-lg">
      <section class="songs">
        <SongsList
          v-if="songs"
          class="list__song"
          :songs="songs"
          :canAddToLibrary="true"
          location="album"
        >
        </SongsList>
        <div v-intersect="onIntersect"></div>
      </section>
    </v-row>
  </v-container>
  <template v-if="isLoading">
    <ClipLoader
      class="loader"
      :loading="isLoading"
      color="#fe7e91"
      size="100px"
    ></ClipLoader>
    <h3 class="loader-text">Loading...</h3>
  </template>
</template>
<script>
import { getAllSongsInAlbum } from "@/services/AlbumService";
import SongsList from "@/components/SongsList";
import ClipLoader from "vue-spinner/src/ClipLoader";

export default {
  data() {
    return {
      songs: [],
      isLoading: false,
      error: null,
    };
  },

  methods: {
    getSongs() {
      this.isLoading = true;
      getAllSongsInAlbum(this.$route.params.id).then((res) => {
        if (res.error?.code === 4) {
          this.error = res.error;
        } else {
          this.isLoading = false;
          this.error = null;
        }

        const artistPicture = res.artist?.picture;
        const tracks = res?.tracks?.data;
        this.songs = tracks?.map((track) => {
          const newTrack = { ...track };
          track.artist.picture = artistPicture;
          return newTrack;
        });
        this.$store.dispatch("setSongsViaApp", this.songs);
      });
    },
  },

  watch: {
    error: function (newError) {
      if (newError) {
        setTimeout(() => {
          console.log("repeat");
          this.getSongs();
        }, 2500);
      }
    },
  },

  components: {
    SongsList,
    ClipLoader,
  },

  mounted() {
    this.getSongs();
  },
};
</script>
<style scoped>
.row {
  margin: 0;
}

.row__theme_default {
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
.album_img {
  height: 150px;
  width: 150px;
}
.title_text {
  padding-top: 0;
  padding-bottom: 0;
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
