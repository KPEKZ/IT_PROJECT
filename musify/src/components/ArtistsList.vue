<template>
  <v-carousel class="carousel" hide-delimiters>
    <template :key="index" v-for="(artistChunk, index) in clearedArtists">
      <v-carousel-item>
        <v-row class="carousel-row">
          <template :key="i" v-for="(artist, i) in artistChunk">
            <v-col class="carousel-col">
              <ArtistItem :item="artist"></ArtistItem>
            </v-col>
          </template>
        </v-row>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>

<script>
import _ from "lodash";
import ArtistItem from "@/components/ArtistItem";

export default {
  name: "ArtistsList",
  data() {
    return {
      columns: 4,
    };
  },
  props: {
    artists: {
      type: Array,
    },
  },

  components: {
    ArtistItem,
  },

  computed: {
    clearedArtists() {
      const filteredAlbums = _.uniqBy(this.artists, (album) => album.id);
      const splitedAlbums = this.splitIntoChunks(filteredAlbums);
      return splitedAlbums;
    },
  },

  methods: {
    splitIntoChunks(artists) {
      const splitedAlbums = [];
      let chunk = [];
      let albumCount = 0;

      for (let i = 0; i < artists.length; i++) {
        chunk.push(artists[i]);
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
