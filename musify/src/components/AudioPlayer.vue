<template>
  <div v-if="getCurrentSongObj" class="card rounded-lg">
    <v-img class="img" :src="getCurrentSongObj?.album?.cover" cover></v-img>
    <div class="card__content">
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
      <v-row class="row controls justify-center">
        <v-btn
          class="controls-btn controls__play-stop-btn"
          :icon="'mdi-skip-previous'"
          variant="text"
          :disabled="getCurrentSongPos === 0"
          @click="playPreviousSong()"
        ></v-btn>
        <template v-if="getIsPlaying">
          <v-btn
            class="controls-btn controls__play-stop-btn"
            :icon="'mdi-pause-circle'"
            variant="text"
            @click="stopSong()"
          ></v-btn>
        </template>
        <template v-if="!getIsPlaying">
          <v-btn
            class="controls-btn controls__play-stop-btn"
            :icon="'mdi-play-circle'"
            variant="text"
            @click="playSong()"
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
    </div>
  </div>
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
        oldSong.removeEventListener("ended", this.setSongPlayingToFalse);
      }
      if (newSong) {
        this.currentTime = 0;
        this.durationTime = 0;
        this.currentWidth = 0;
        newSong.addEventListener("timeupdate", this.updateSongTime);
        newSong.addEventListener("loadedmetadata", this.updateDuration);
        newSong.addEventListener("ended", this.setSongPlayingToFalse);
      }
    },

    currentTime: function () {
      this.currentWidth += this.transformTimeToWidth();
    },
  },

  computed: {
    getCurrentSongObj() {
      return this.$store.getters.getCurrentSongDto;
    },
    getCurrentSong() {
      return this.$store.getters.getCurrentSongAudio;
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
      if (this.durationTime === 0) return 0;

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
      this.stopSong();
      const songPos = this.getCurrentSongPos + 1;
      const currSongFromQueue = this.getCurrentPlayQueue[songPos];
      const song = new Audio(currSongFromQueue.preview);
      song.preload = "metadata";
      this.$store.dispatch("setCurrentSongDto", currSongFromQueue);
      this.$store.dispatch("setCurrentSongAudio", song);
      this.$store.dispatch("setIsPlaying", true);
      this.$store.dispatch("setCurrentPlayQueue", this.getCurrentSongLocation);
      this.$store.dispatch(
        "setCurrentSongLocation",
        this.getCurrentSongLocation
      );
      this.$store.dispatch("setCurrentSongPos", currSongFromQueue);
      this.thisSongIsPlaying = true;
      song.play();
    },

    playPreviousSong() {
      this.stopSong();
      const songPos = this.getCurrentSongPos - 1;
      const currSongFromQueue = this.getCurrentPlayQueue[songPos];
      const song = new Audio(currSongFromQueue.preview);
      song.preload = "metadata";
      this.$store.dispatch("setCurrentSongDto", currSongFromQueue);
      this.$store.dispatch("setCurrentSongAudio", song);
      this.$store.dispatch("setIsPlaying", true);
      this.$store.dispatch("setCurrentPlayQueue", this.getCurrentSongLocation);
      this.$store.dispatch(
        "setCurrentSongLocation",
        this.getCurrentSongLocation
      );
      this.$store.dispatch("setCurrentSongPos", currSongFromQueue);
      this.thisSongIsPlaying = true;
      song.play();
    },

    playSong() {
      this.getCurrentSong?.play();
      this.$store.dispatch("setIsPlaying", true);
      this.thisSongIsPlaying = true;
    },

    stopSong() {
      this.getCurrentSong?.pause();
      this.$store.dispatch("setIsPlaying", false);
      this.thisSongIsPlaying = false;
    },

    setSongPlayingToFalse() {
      this.$store.dispatch("setIsPlaying", false);
      this.currentWidth = 0;
      this.currentTime = 0;
      if (this.getCurrentSongPos < this.getCurrentPlayQueue.length - 1) {
        this.playNextSong();
      }
    },
  },

  mounted() {},
};
</script>

<style scoped>
.card {
  display: flex;
  gap: 30px;
  position: relative;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  overflow: visible;
  height: 100%;
  flex: 3 1;
}

.card__content {
  display: flex;
  flex: 2 1;
}

.controls {
  gap: 10px;
  flex: 1 1;
  min-width: max-content;
}

.controls-btn {
  width: 50px;
  height: 50px;
  color: #fff;
}

.controls__play-stop-btn {
  font-size: 30px;
}

.row {
  margin: 0;
}

.v-img {
  position: relative;
  max-width: 50px;
  max-height: 50px;
  width: 50px;
  height: 50px;
  box-shadow: 0px 10px 20px 0px rgb(76 70 124 / 50%);
  display: block;
}

img {
  border-radius: 7px;
}

.progress__bar {
  background-color: #d1d1d1;
  border-radius: 25px;
  height: 6px;
  width: 100%;
}

.progress__current {
  background-color: #fff;
  border-radius: 25px;
  height: 100%;
  width: 0;
}

.progress__time {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
</style>
