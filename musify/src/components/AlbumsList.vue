<template>
  <v-carousel class="carousel" hide-delimiters>
    <template :key="index" v-for="(albumChunk, index) in clearedAlbums">
      <v-carousel-item>
        <v-row class="carousel-row">
          <template :key="i" v-for="(album, i) in albumChunk">
            <v-col class="carousel-col">
              <AlbumItem :item="album"></AlbumItem>
            </v-col>
          </template>
        </v-row>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>

<script>
import AlbumItem from "@/components/AlbumItem";
import _ from "lodash";

export default {
  name: "AlbumsList",

  data() {
    return {
      columns: 4,
    };
  },
  components: {
    AlbumItem,
  },
  props: {
    albums: {
      type: Array,
    },
  },

  computed: {
    clearedAlbums() {
      const filteredAlbums = _.uniqBy(this.albums, (album) => album.id);
      const splitedAlbums = this.splitIntoChunks(filteredAlbums);
      return splitedAlbums;
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
};
</script>

<style scoped>
.v-carousel {
  height: 300px !important;
}
.carousel-row {
  height: 100%;
  justify-content: center;
}
.carousel-col {
  flex-basis: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 0;
}
</style>
