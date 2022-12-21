<template>
  <v-hover open-delay="100" close-delay="00">
    <template v-slot="{ isHovering, props }">
      <v-list-item
        v-bind="props"
        class="song"
        :title="song.title"
        :subtitle="song.artist.name"
        :active="sameSongFromStore"
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
          <template v-if="songIsPlaying">
            <v-btn
              @click="stopSong()"
              :icon="'mdi-stop'"
              variant="text"
            ></v-btn>
          </template>

          <template v-if="!songIsPlaying">
            <v-btn
              @click="playSong(song)"
              :icon="'mdi-play-outline'"
              variant="text"
            ></v-btn>
          </template>

          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn :icon="'mdi-menu'" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list>
              <template v-if="canAddToLibrary">
                <v-list-item>
                  <v-tooltip text="Add to library">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :icon="'mdi-plus'"
                        variant="text"
                        v-bind="props"
                        @click="onAddToLibrary(song)"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                </v-list-item>
              </template>

              <template v-if="!canAddToLibrary">
                <v-list-item>
                  <v-tooltip text="Delete from library">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :icon="'mdi-delete'"
                        variant="text"
                        v-bind="props"
                        @click="onDeleteFromLibrary(song)"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </template>
  </v-hover>
  <v-snackbar v-model="snackBarIsOpened">
    <span class="mr-3">Song has been added success</span>
    <v-icon icon="mdi-check-circle-outline" color="success"></v-icon>
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackBarIsOpened = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { removeSongLocal, saveSongLocal } from "@/services/LocalStorage";

export default {
  name: "SongItem",
  data() {
    return {
      snackBarIsOpened: false,
      songIsPlaying: false,
      sameSongFromStore: false,
    };
  },

  props: {
    song: {
      type: Object,
    },
    canAddToLibrary: Boolean,
    location: String,
  },

  computed: {
    getCurrentSongAudio() {
      return this.$store.getters.getCurrentSongAudio;
    },
    getCurrentSongId() {
      return this.$store.getters.getCurrentSongId;
    },
  },

  watch: {
    getCurrentSongId: function (newId) {
      if ((newId !== null || undefined) && newId !== this.song.id) {
        this.songIsPlaying = false;
        this.sameSongFromStore = false;
      }
      if ((newId !== null || undefined) && newId === this.song.id) {
        this.sameSongFromStore = true;
      }
    },

    getCurrentSongAudio: function (newAudio, oldAudio) {
      if (oldAudio) {
        newAudio.removeEventListener("ended", this.setSongPlayingToFalse);
        newAudio.removeEventListener("play", this.setSongPlayingToTrue);
      }
      if (newAudio) {
        newAudio.addEventListener("ended", this.setSongPlayingToFalse);
        newAudio.addEventListener("play", this.setSongPlayingToTrue);
      }
    },
  },

  methods: {
    playSong(currSong) {
      this.stopSong();
      const songAudio = new Audio(currSong.preview);
      songAudio.preload = "metadata";
      this.$store.dispatch("setCurrentSongDto", currSong);
      this.$store.dispatch("setCurrentSongAudio", songAudio);
      this.$store.dispatch("setIsPlaying", true);
      this.$store.dispatch("setCurrentPlayQueue", this.location);
      this.$store.dispatch("setCurrentSongLocation", this.location);
      this.$store.dispatch("setCurrentSongPos", currSong);
      this.songIsPlaying = true;
      songAudio.play();
    },

    stopSong() {
      this.getCurrentSongAudio?.pause();
      this.$store.dispatch("setIsPlaying", false);
      this.songIsPlaying = false;
    },

    onAddToLibrary(song) {
      saveSongLocal(song);
      this.$store.dispatch("addLibrarySong", song);
      this.snackBarIsOpened = true;
    },

    onDeleteFromLibrary(song) {
      removeSongLocal(song.id);
      this.$store.dispatch("deleteFromLibrarySong", song);
    },

    setSongPlayingToFalse() {
      this.songIsPlaying = false;
    },
    setSongPlayingToTrue() {
      if (this.sameSongFromStore) this.songIsPlaying = true;
    },
  },
};
</script>

<style scoped></style>
