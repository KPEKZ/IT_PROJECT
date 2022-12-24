<template>
  <v-carousel class="carousel" hide-delimiters>
    <template :key="index" v-for="(artistChunk, index) in clearedArtists">
      <v-carousel-item>
        <v-row class="carousel-row">
          <template :key="i" v-for="(artist, i) in artistChunk">
            <v-col class="carousel-col">
              <ArtistItem
                :artist="artist"
                :canAddToLibrary="canAddToLibrary"
              ></ArtistItem>
            </v-col>
          </template>
        </v-row>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>

<script>
import ArtistItem from "@/components/ArtistItem";
import splitedUniqueArray from "@/helpers/splited-unique-array";

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
    canAddToLibrary: Boolean,
  },

  components: {
    ArtistItem,
  },

  computed: {
    clearedArtists() {
      return splitedUniqueArray(this.artists, this.columns, "id");
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
