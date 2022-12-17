<template>
  <router-link :to="'artist/' + this.item.id" class="link">
    <v-card :elevation="0" class="artist" width="170" height="215">
      <v-img cover :src="item?.picture"></v-img>
      <v-card-title>{{ item?.name }}</v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "ArtistItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
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
