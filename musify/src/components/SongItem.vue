<template>
  <v-list-item :title="song.title" :subtitle="song.artist.name">
    <template v-slot:prepend>
      <v-avatar :image="song.artist.picture" :rounded="0"></v-avatar>
    </template>
    <template v-slot:append>
      <v-btn :icon="'mdi-play-outline'" variant="text"></v-btn>
      <v-btn :icon="'mdi-menu'" variant="text"></v-btn>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    song: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
