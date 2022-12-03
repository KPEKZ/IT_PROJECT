<template>
  <v-list lines="one" class="list">
    <SongItem v-for="item in songs" :key="item.id" :song="item"></SongItem>
    <div v-intersect="onIntersect"></div>
  </v-list>
</template>

<script>
import SongItem from "@/components/SongItem";

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
  },
  methods: {
    onIntersect(isIntersecting) {
      this.isIntersecting = isIntersecting;
    },
  },
  components: {
    SongItem,
  },

  watch: {
    isIntersecting: function (newValue) {
      this.isIntersecting = newValue;
      if (newValue) {
        this.$emit("loadNextSongs");
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
