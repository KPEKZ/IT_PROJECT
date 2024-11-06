<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <router-link :to="'artist/' + this.artist.id" class="link">
        <v-card
          :elevation="0"
          class="artist"
          width="170"
          height="215"
          v-bind="props"
        >
          <v-img cover :src="artist?.picture"></v-img>
          <v-card-title>{{ artist?.name }}</v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </router-link>
    </template>
    <v-list width="80">
      <template v-if="canAddToLibrary">
        <v-list-item>
          <v-tooltip text="Add to library" top>
            <template v-slot:activator="{ props }">
              <v-btn
                :icon="'mdi-plus'"
                variant="text"
                v-bind="props"
                @click="onAddToLibrary(artist)"
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
                @click="onDeleteFromLibrary(artist)"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
  <v-snackbar v-model="snackBarIsOpened">
    <span class="mr-3">Artist has been added success</span>
    <v-icon icon="mdi-check-circle-outline" color="success"></v-icon>
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackBarIsOpened = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { removeArtistLocal, saveArtistLocal } from "@/services/LocalStorage";

export default {
  name: "ArtistItem",
  data() {
    return {
      snackBarIsOpened: false,
    };
  },
  props: {
    artist: {
      type: Object,
      default() {
        return {};
      },
    },
    canAddToLibrary: Boolean,
  },
  methods: {
    onAddToLibrary(artist) {
      saveArtistLocal(artist);
      this.$store.dispatch("library/addLibraryArtist", artist);
      this.snackBarIsOpened = true;
    },

    onDeleteFromLibrary(artist) {
      removeArtistLocal(artist.id);
      this.$store.dispatch("library/deleteFromLibraryArtist", artist);
    },
  },
};
</script>

<style scoped>
.v-card-title {
  font-size: 13px !important;
  color: #001950;
}

.v-card {
  min-width: 170px;
  min-height: 215px;
}

.link {
  text-decoration: none;
}

.artist:hover {
  background: #e2e2e2;
}

.artist {
  cursor: pointer;
}
</style>
