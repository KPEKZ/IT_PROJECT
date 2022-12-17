<template>
  <router-link :to="'album/' + this.item.id" class="link">
    <v-card :elevation="0" class="album" width="170" height="215">
      <v-img cover :src="item?.cover"></v-img>
      <v-card-title>{{ item?.title }}</v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </router-link>
</template>
<script>
export default {
  name: "AlbumItem",
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
