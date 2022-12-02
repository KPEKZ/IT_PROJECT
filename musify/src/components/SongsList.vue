<template>
  <v-list lines="one" class="list__song">
    <SongItem v-for="item in songs" :key="item.id" :song="item"></SongItem>
  </v-list>
</template>

<script>
import SongItem from "@/components/SongItem";

export default {
  name: "SongsList",
  props: {
    songs: {
      type: Array,
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped></style>
