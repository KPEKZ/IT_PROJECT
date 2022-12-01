<template><div></div></template>

<script>
export default {
  name: "LibraryView",
  data() {
    return {
      albums: [],
      albumsChunks: [],
    };
  },
  mounted() {
    this.$store.dispatch("fetchSongs", "eminem");
    this.albums = this.$store.getters.getAlbums;
    for (let chunks = 0; chunks < this.albums.length; chunks += 5) {
      let albumsChunks = [];
      for (let ch = chunks; ch < 5; ch++) {
        albumsChunks.push(this.album[ch]);
      }
      this.albumsChunks.push(albumsChunks);
    }
    console.log(this.albumsChunks);
  },
};
</script>

<style scoped>
.albums {
  display: flex;
  overflow: auto;
  gap: 20px;
}
</style>
