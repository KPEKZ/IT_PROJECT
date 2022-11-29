<template>
  <v-card :elevation="0" class="album" width="170" height="215">
    <v-img cover :src="item?.cover"></v-img>
    <v-card-title>{{ item?.title }}</v-card-title>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Album",
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
</style>
