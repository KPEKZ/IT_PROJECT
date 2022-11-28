<template>
  <v-text-field
    label="Search your favorite song..."
    type="text"
    @input="updateQuery"
    v-model="query"
  >
  </v-text-field>

  <v-list v-if="songs" lines="one" class="list__song">
    <v-list-item
      v-for="item in songs"
      :key="item.id"
      :title="item.title"
      :subtitle="item.artist.name"
      :prepend-avatar="item.artist.picture"
    >
      <v-btn class="play__btn">
        <v-icon size="20px">mdi-play</v-icon>
      </v-btn>
    </v-list-item>
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

<style scoped>
.play__btn {
  box-shadow: none;
  border-radius: 20px;
  height: 20px;
  width: 20px;
}
</style>
