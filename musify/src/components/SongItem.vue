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
          <template v-if="thisSongIsPlaying">
            <v-btn
              @click="stopSong()"
              :icon="'mdi-pause'"
              variant="text"
            ></v-btn>
          </template>

          <template v-if="!thisSongIsPlaying">
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
export default {
  name: "SongItem",
  data() {
    return {
      snackBarIsOpened: false,
      thisSongIsPlaying: false,
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
    getCurrentSong() {
      return this.$store.getters.getCurrentSong;
    },
    getCurrentSongId() {
      return this.$store.getters.getCurrentSongId;
    },
  },

  watch: {
    getCurrentSong: function () {},

    getCurrentSongId: function (newId) {
      if ((newId !== null || undefined) && newId !== this.song.id) {
        this.thisSongIsPlaying = false;
        this.getCurrentSong?.removeEventListener(
          "ended",
          this.setSongPlayingToFalse
        );
      }
    },
  },

  methods: {
    playSong(currSong) {
      this.stopSong();
      const song = new Audio(currSong.preview);
      song.preload = "metadata";
      song.addEventListener("ended", this.setSongPlayingToFalse);
      this.$store.dispatch("setCurrentSong", song);
      this.$store.dispatch("setIsPlaying", true);
      this.$store.dispatch("setCurrentSongId", this.song.id);
      this.$store.dispatch("setCurrentSongRef", currSong);
      this.$store.dispatch("setCurrentPlayQueue", this.location);
      this.$store.dispatch("setCurrentSongPos", currSong);
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

    onAddToLibrary(song) {
      this.$store.dispatch("addLibrarySong", song);
      this.snackBarIsOpened = true;
    },

    onDeleteFromLibrary(song) {
      this.$store.dispatch("deleteFromLibrarySong", song);
    },

    setSongPlayingToFalse() {
      this.thisSongIsPlaying = false;
    },
  },

  onmounted() {
    this.getCurrentSong?.removeEventListener(
      "ended",
      this.setSongPlayingToFalse
    );
  },
};
</script>

<style scoped></style>
