<template>
  <v-list lines="one" class="list">
    <SongItem
      v-for="item in songs"
      :key="item.id"
      :song="item"
      :canAddToLibrary="canAddToLibrary"
      :location="location"
    ></SongItem>
    <div v-intersect="onIntersect"></div>
    <ClipLoader
      class="loader"
      :loading="getSongsInListLoading && canNextLoad"
      color="#fe7e91"
      size="100px"
    ></ClipLoader>
  </v-list>
</template>

<script>
import SongItem from "@/components/SongItem";
import ClipLoader from "vue-spinner/src/ClipLoader";

export default {
  name: "SongsList",
  data() {
    return {
      isIntersecting: false,
    };
  },
  props: {
    songs: {
      type: Array,
    },
    location: String,
    canAddToLibrary: Boolean,
    canNextLoad: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    SongItem,
    ClipLoader,
  },

  methods: {
    onIntersect(isIntersecting) {
      this.isIntersecting = isIntersecting;
    },
  },

  computed: {
    getSongsInListLoading() {
      return this.$store.getters.getSongsInListLoading;
    },
    getErrorLoad() {
      return this.$store.getters.getNextErrorLoad;
    },
  },

  watch: {
    isIntersecting: function (newValue) {
      this.isIntersecting = newValue;
      if (newValue && this.canNextLoad) {
        this.$emit("loadNextSongs");
      }
    },

    getErrorLoad(error) {
      if (error && this.canNextLoad) {
        setTimeout(() => {
          this.$emit("loadNextSongs");
        }, 2500);
      }
    },
  },
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 100%;
}
</style>
