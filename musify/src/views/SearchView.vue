<template>
  <v-text-field
    label="Search your favorite song..."
    type="text"
    @input="updateQuery"
    v-model="query"
  >
  </v-text-field>

<!--  <v-list v-if="songs" lines="one">-->
<!--    <v-list-item-->
<!--      v-for="item in songs"-->
<!--      :key="item.id"-->
<!--      :title="item.title"-->
<!--      subtitle="..."-->
<!--    ></v-list-item>-->
<!--  </v-list>-->

<!--  <v-list v-if="albums" lines="one">-->
<!--    <v-list-item-->
<!--      v-for="album in albums"-->
<!--      :key="album.id"-->
<!--      :title="album.title"-->
<!--      subtitle="..."-->
<!--    ></v-list-item>-->
<!--  </v-list>-->

  <v-list v-if="artists" lines="one">
    <v-list-item
      v-for="artist in artists"
      :key="artist.id"
      :title="artist.name"
      subtitle="..."
    ></v-list-item>
  </v-list>
</template>

<script>
import _debounce from "lodash/debounce";

export default {
  name: "SearchView",

  data() {
    return {
      query: null,
      songs: null,
      albums: null,
      artists: null,
    };
  },

  computed: {
    getSongs() {
      return this.$store.getters.getSongs;
    },
  },

  watch: {
    changeQuery(value) {
      this.query = value;
    },
  },

  methods: {
    getArtists() {
      return this.$store.getters.getArtists;
    },

    updateQuery(event) {
      this.updateValueWithDelay(event.target.value);
    },

    updateValueWithDelay: _debounce(function (value) {
      this.$emit("input", value);
      this.$store.dispatch("fetchSongs", value);
      this.songs = this.$store.getters.getSongs;
      this.albums = this.$store.getters.getAlbums;
      this.artists = this.getArtists();
    }, 500),
  },
  mounted() {},
};
</script>

<style scoped></style>
