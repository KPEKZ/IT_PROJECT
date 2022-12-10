<template>
  <v-card
    width="400px"
    height="420px"
    v-if="getCurrentSong"
    class="card rounded-lg"
  >
    <v-img
      :src="getCurrentSong?.album?.cover"
      width="290px"
      height="230px"
      class="card-img rounded-lg"
    ></v-img>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      currentSong: null,
    };
  },

  computed: {
    getCurrentSong() {
      return this.$store.getters.getCurrentSongRef;
    },
  },

  mounted() {
    this.currentSong = this.getCurrentSong;
  },
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  padding: 20px;
  overflow: visible;
  box-shadow: 0px 15px 35px -5px rgb(50 88 130 / 32%);
}

.v-img {
  position: absolute;
  margin: auto;
  content: "";
  box-shadow: 0px 10px 40px 0px rgb(76 70 124 / 50%);
  display: block;
  z-index: 2;
  border-radius: 15px;
  bottom: 60%;
}
</style>
