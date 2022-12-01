<template>
  <v-container class="container">
    <v-row class="row rounded-lg">
      <h3 class="header">Albums</h3>
      <v-carousel class="carousel" hide-delimiters>
        <template :key="index" v-for="(albumChunk, index) in clearedAlbums">
          <v-carousel-item>
            <v-row class="carousel-row">
              <template :key="i" v-for="(album, i) in albumChunk">
                <v-col class="carousel-col">
                  <Album :item="album"></Album>
                </v-col>
              </template>
            </v-row>
          </v-carousel-item>
        </template>
      </v-carousel>
    </v-row>
    <v-row class="row rounded-lg">
      <section class="songs">
        <h3 class="header">Songs</h3>

        <v-list v-if="getSongs" lines="one" class="list__song">
          <v-list-item
            v-for="item in getSongs"
            :key="item.id"
            :title="item.title"
            :subtitle="item.artist.name"
          >
            <template v-slot:prepend>
              <v-avatar :image="item.artist.picture" :rounded="0"></v-avatar>
            </template>
            <template v-slot:append>
              <v-btn :icon="'mdi-play-outline'" variant="text"></v-btn>
              <v-btn :icon="'mdi-menu'" variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";
import Album from "@/components/Album";

export default {
  name: "LibraryView",
  data() {
    return {
      columns: 4,
      albums: [],
    };
  },

  components: {
    Album,
  },
  computed: {
    clearedAlbums() {
      const filteredAlbums = _.uniqBy(this.albums, (album) => album.id);
      const splitedAlbums = this.splitIntoChunks(filteredAlbums);
      return splitedAlbums;
    },

    getSongs() {
      return this.$store.getters.getSongs;
    },

    getAlbums() {
      return this.$store.getters.getAlbums;
    },
  },
  methods: {
    splitIntoChunks(albums) {
      const splitedAlbums = [];
      let chunk = [];
      let albumCount = 0;

      for (let i = 0; i < albums.length; i++) {
        chunk.push(albums[i]);
        albumCount++;

        if (albumCount === this.columns) {
          splitedAlbums.push(chunk);
          chunk = [];
          albumCount = 0;
        }
      }
      splitedAlbums.push(chunk);
      chunk = 0;

      return splitedAlbums;
    },
  },

  mounted() {
    this.$store.dispatch("fetchSongs", "eminem");
    this.albums = this.$store.getters.getAlbums;
  },
};
</script>

<style scoped>
.albums {
  display: flex;
  overflow: auto;
  gap: 20px;
}

.carousel-row {
  height: 100%;
  justify-content: center;
}

.row {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
}

.v-carousel {
  height: 300px !important;
}

.header {
  color: #69686f;
  margin-left: 70px;
  margin-top: 20px;
}

.carousel-col {
  flex-basis: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 0;
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
