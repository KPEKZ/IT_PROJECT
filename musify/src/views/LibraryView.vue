<template>
  <v-container>
    <!--    <section class="albums">-->
    <!--      <Album v-for="item in albums" :key="item.id" :item="item" />-->
    <!--    </section>-->
    <v-carousel v-if="albums" class="carousel">
      <v-carousel-item :key="i" v-for="(chunk, i) in albumsChunks">
        <Album :key="j" v-for="(slide, j) in chunk" :item="slide" />
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import Album from "@/components/Album";

export default {
  name: "LibraryView",
  data() {
    return {
      albums: [],
      albumsChunks: [],
    };
  },
  components: {
    Album,
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
