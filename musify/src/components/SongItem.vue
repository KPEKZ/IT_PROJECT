<template>
  <v-hover open-delay="100" close-delay="00">
    <template v-slot="{ isHovering, props }">
      <v-list-item
        v-bind="props"
        class="song"
        :title="song.title"
        :subtitle="song.artist.name"
        :style="
          isHovering
            ? { backgroundColor: '#e2e2e2' }
            : { backgroundColor: '#FFF' }
        "
      >
        <template v-slot:prepend>
          <v-avatar
            size="60"
            :image="song.artist.picture"
            class="rounded"
          ></v-avatar>
        </template>
        <template v-slot:append>
          <v-btn :icon="'mdi-play-outline'" variant="text"></v-btn>
          <v-btn :icon="'mdi-menu'" variant="text"></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-hover>
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
