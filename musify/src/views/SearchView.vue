<template>
  <v-text-field
    label="Search your favorite song..."
    type="text"
    @input="updateQuery"
    v-model="query"
  >
  </v-text-field>
  <SongsList class="list__song" :songs="songs"></SongsList>
</template>

<script>
import _debounce from "lodash/debounce";
import SongsList from "@/components/SongsList";

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

  components: {
    SongsList,
  },

  computed: {
    getSongs() {
      return this.$store.getters.getSongs;
    },

    getArtists() {
      return this.$store.getters.getArtists;
    },

    getAlbums() {
      return this.$store.getters.getAlbums;
    },
  },

  watch: {
    changeQuery(value) {
      this.query = value;
    },
  },

  methods: {
    updateQuery(event) {
      this.updateValueWithDelay(event.target.value);
    },

    updateValueWithDelay: _debounce(function (value) {
      this.$emit("input", value);
      this.$store.dispatch("fetchSongs", value);
      this.songs = this.$store.getters.getSongs;
      this.albums = this.$store.getters.getAlbums;
      this.artists = this.$store.getters.getArtists;
    }, 500),
  },
};
</script>

<style scoped></style>
