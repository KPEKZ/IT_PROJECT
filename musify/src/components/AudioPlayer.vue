<template>
  <v-card
    width="400px"
    height="420px"
    v-if="getCurrentSongObj"
    class="card rounded-lg"
  >
    <v-img
      :src="getCurrentSongObj?.album?.cover_big"
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
          :disabled="getCurrentSongPos === 0"
        ></v-btn>
        <template v-if="getIsPlaying">
          <v-btn
            class="controls-btn controls__play-stop-btn"
            :icon="'mdi-stop-circle'"
            variant="text"
            @click="stopSong()"
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
          :disabled="getCurrentSongPos >= getCurrentPlayQueue.length - 1"
          @click="playNextSong()"
        ></v-btn>
      </v-row>
      <v-row class="row progress">
        <div class="progress__time">
          <div class="time__current">
            {{ currentTime.toFixed() }}
          </div>
          <div class="time__duration">
            {{ durationTime.toFixed() }}
          </div>
        </div>
        <div class="progress__bar">
          <div
            :style="{ width: Math.min(currentWidth, 100) + '%' }"
            class="progress__current"
          ></div>
        </div>
      </v-row>
      <v-row class="row"> </v-row>
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
      widthStep: 0,
      durationTime: 0,
      thisSongIsPlaying: false,
    };
  },

  watch: {
    getCurrentSong: function (newSong, oldSong) {
      if (oldSong) {
        oldSong.removeEventListener("timeupdate", this.updateSongTime);
        oldSong.removeEventListener("loadedmetadata", this.updateDuration);
        this.currentTime = 0;
        this.durationTime = 0;
      }
      if (newSong) {
        newSong.addEventListener("timeupdate", this.updateSongTime);
        newSong.addEventListener("loadedmetadata", this.updateDuration);
      }
    },

    currentTime: function () {
      this.currentWidth += this.transformTimeToWidth();
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
    getCurrentPlayQueue() {
      return this.$store.getters.getCurrentPlayQueue;
    },
    getCurrentSongPos() {
      return this.$store.getters.getCurrentSongPos;
    },
    getCurrentSongLocation() {
      return this.$store.getters.getCurrentSongLocation;
    },
  },

  methods: {
    updateSongTime() {
      this.currentTime = +this.getCurrentSong.currentTime.toFixed();
    },
    transformTimeToWidth() {
      return +(
        (this.widthStep * 100 * +(100 / this.durationTime).toFixed(2)) /
        this.durationTime
      ).toFixed(2);
    },
    updateDuration(event) {
      this.durationTime = event.target.duration;
      this.widthStep = +(this.durationTime / 100).toFixed(2);
    },
    playNextSong() {
      console.log(this.getCurrentPlayQueue);
      this.stopSong();
      const currSongFromQueue =
        this.getCurrentPlayQueue[this.getCurrentSongPos + 1];
      const song = new Audio(currSongFromQueue.preview);
      song.preload = "metadata";
      song.addEventListener("ended", this.setSongPlayingToFalse);
      this.$store.dispatch("setCurrentSong", song);
      this.$store.dispatch("setIsPlaying", true);
      this.$store.dispatch("setCurrentSongId", currSongFromQueue.id);
      this.$store.dispatch("setCurrentSongRef", currSongFromQueue);
      this.$store.dispatch("setCurrentPlayQueue", this.getCurrentSongLocation);
      this.$store.dispatch("setCurrentSongPos", currSongFromQueue);
      console.log(this.getCurrentSongPos);
      this.thisSongIsPlaying = true;
      song.play();
    },

    stopSong() {
      const song = this.getCurrentSong;
      song?.pause();
      song?.removeEventListener("ended", this.setSongPlayingToFalse);
      this.$store.dispatch("setCurrentSong", null);
      this.$store.dispatch("setIsPlaying", false);
      this.$store.dispatch("setCurrentSongId", null);
      this.$store.dispatch("setCurrentSongRef", null);
      this.thisSongIsPlaying = false;
    },

    setSongPlayingToFalse() {
      if (this.getCurrentSongPos < this.getCurrentPlayQueue.length - 1) {
        this.playNextSong();
        this.thisSongIsPlaying = true;
      }
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
  width: 60px;
  height: 60px;
  color: #fd516b;
}

.controls__play-stop-btn {
  font-size: 40px;
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
  background-color: #ffebee;
  border-radius: 25px;
  height: 6px;
  width: 100%;
}

.progress__current {
  background-color: #fd516b;
  border-radius: 25px;
  height: 100%;
  width: 0;
  color: #69686f;
}

.progress__time {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #69686f;
}
</style>
