<template>
  <v-container class="container">
    <v-text-field
      label="Search your favorite song..."
      type="text"
      @input="updateQuery"
      v-model="query"
      variant="outlined"
    >
      <template v-slot:append-inner>
        <v-icon icon="mdi-magnify"></v-icon>
      </template>
    </v-text-field>
    <v-row class="row"> <h3 class="header">Songs</h3></v-row>
    <v-row class="row row__theme-default songs">
      <SongsList
        @load-next-songs="loadNextSongs"
        v-if="songs"
        class="list__song"
        :songs="getSongs"
      ></SongsList>
    </v-row>
  </v-container>
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
      nextSongs: undefined,
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
    getNextSongs() {
      return this.$store.getters.getNextSongs;
    },
  },

  watch: {
    getSongs: function (newSongs) {
      this.songs = newSongs;
    },
    getNextSongs: function (newNextSongs) {
      this.nextSongs = newNextSongs;
    },
  },

  methods: {
    updateQuery(event) {
      this.updateValueWithDelay(event.target.value);
    },

    updateValueWithDelay: _debounce(function (value) {
      this.$emit("input", value);
      this.$store.dispatch("fetchInitSongs", value);
      this.songs = this.$store.getters.getSongs;
      this.albums = this.$store.getters.getAlbums;
      this.artists = this.$store.getters.getArtists;
    }, 500),

    loadNextSongs() {
      if (this.getNextSongs > 0) {
        console.log(this.getNextSongs, this.query);
        this.$store.dispatch("fetchNextSongs", this.query);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}

.row {
  margin: 0;
}

.row__theme-default {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
}

.songs {
  height: 400px;
}

.header {
  color: #69686f;
}
</style>
