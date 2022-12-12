<template>
  <v-card
    width="400px"
    height="420px"
    v-if="getCurrentSongObj"
    class="card rounded-lg"
  >
    <v-img
      :src="getCurrentSongObj?.album?.cover"
      width="290px"
      height="230px"
      class="card-img rounded-lg"
      cover
    ></v-img>
    <v-card-text class="card__content">
      <v-row class="row controls justify-center">
        <v-btn
          class="controls-btn controls__play-stop-btn"
          :icon="'mdi-skip-previous'"
          variant="text"
        ></v-btn>
        <template v-if="getIsPlaying">
          <v-btn
            class="controls-btn controls__play-stop-btn"
            :icon="'mdi-stop-circle'"
            variant="text"
          ></v-btn>
        </template>
        <template v-if="!getIsPlaying">
          <v-btn
            class="controls-btn controls__play-stop-btn"
            :icon="'mdi-play-circle'"
            variant="text"
          ></v-btn>
        </template>
        <v-btn
          class="controls-btn controls__play-stop-btn"
          :icon="'mdi-skip-next'"
          variant="text"
        ></v-btn>
      </v-row>
      <v-row class="row progress">
        <div class="progress__bar">
          <div
            :style="{ width: currentWidth + '%' }"
            class="progress__current"
          ></div>
        </div>
      </v-row>
      <v-row class="row">
        {{ currentTime }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      currentSong: null,
      currentTime: 0,
      currentWidth: 0,
      widthSteps: 0,
      durationTime: 0,
    };
  },

  watch: {
    getCurrentSong: function (newSong, oldSong) {
      if (oldSong) {
        oldSong.removeEventListener("timeupdate", this.updateSongTime);
        oldSong.addEventListener("loadedmetadata", this.updateDuration);
        this.currentTime = 0;
        this.durationTime = 0;
      }
      if (newSong) {
        newSong.addEventListener("timeupdate", this.updateSongTime);
        newSong.addEventListener("loadedmetadata", this.updateDuration);
      }
    },
  },

  computed: {
    getCurrentSongObj() {
      return this.$store.getters.getCurrentSongRef;
    },
    getCurrentSong() {
      return this.$store.getters.getCurrentSong;
    },
    getIsPlaying() {
      return this.$store.getters.getIsPlaying;
    },
  },

  methods: {
    updateSongTime() {
      this.currentTime = +this.getCurrentSong.currentTime.toFixed();
    },
    transformTimeToWidth(step, duration) {
      return +((100 * step) / duration).toFixed(2);
    },
    updateDuration(event) {
      this.durationTime = event.target.duration;
      this.widthStep = +(this.durationTime / 100).toFixed(2);
    },
  },

  mounted() {},
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  overflow: visible;
  box-shadow: 0px 15px 35px -5px rgb(50 88 130 / 32%);
}

.card__content {
  display: flex;
  flex-flow: column nowrap;
  height: 60%;
}

.controls {
  gap: 25px;
}

.controls-btn {
  width: 75px;
  height: 75px;
}

.controls__play-stop-btn {
  font-size: 50px;
}

.row {
  margin: 0;
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

.progress__bar {
  background-color: #d0d8e6;
  height: 6px;
  width: 100%;
}

.progress__current {
  background-color: #a3b3ce;
  height: 100%;
  width: 0;
}
</style>
