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
import { ClearedList } from "@/helpers/ClearedList.js";
import AlbumItem from "@/components/AlbumItem";

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
      return ClearedList(this.albums, this.columns);
    },
  },

  methods: {},
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
