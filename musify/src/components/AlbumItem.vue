<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <router-link :to="'album/' + this.album.id" class="link">
        <v-card
          :elevation="0"
          class="album"
          width="170"
          height="215"
          v-bind="props"
        >
          <v-img cover :src="album?.cover"></v-img>
          <v-card-title>{{ album?.title }}</v-card-title>
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
                @click="onAddToLibrary(album)"
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
                @click="onDeleteFromLibrary(album)"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
  <v-snackbar v-model="snackBarIsOpened">
    <span class="mr-3">Album has been added success</span>
    <v-icon icon="mdi-check-circle-outline" color="success"></v-icon>
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackBarIsOpened = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { removeAlbumLocal, saveAlbumLocal } from "@/services/LocalStorage";

export default {
  name: "AlbumItem",
  data() {
    return {
      snackBarIsOpened: false,
    };
  },
  props: {
    album: {
      type: Object,
      default() {
        return {};
      },
    },
    canAddToLibrary: Boolean,
  },

  methods: {
    onAddToLibrary(album) {
      saveAlbumLocal(album);
      this.$store.dispatch("library/addLibraryAlbum", album);
      this.snackBarIsOpened = true;
    },

    onDeleteFromLibrary(album) {
      removeAlbumLocal(album.id);
      this.$store.dispatch("library/deleteFromLibraryAlbum", album);
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

.album {
  cursor: pointer;
}

.link {
  text-decoration: none;
}

.album:hover {
  background: #e2e2e2;
}
</style>
