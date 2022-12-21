<template>
  <v-app>
    <v-card class="card position-fixed w-100" elevation="2" rounded="0">
      <v-toolbar color="#fd516b">
        <template v-slot:prepend>
          <v-img
            width="64px"
            height="64px"
            src="./assets/app_logo_2.svg"
          ></v-img>
        </template>
        <v-toolbar-title class="title">Musify</v-toolbar-title>
        <AudioPlayer></AudioPlayer>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-main class="main mt-xl-15 mt-sm-15 mt-lg-15">
      <router-view />
    </v-main>
    <v-bottom-navigation :elevation="0" class="navigation">
      <router-link to="/home" custom v-slot="{ href, isActive }">
        <v-btn
          :class="[isActive && 'btn-active']"
          :href="href"
          class="navigation__btn"
        >
          <v-icon
            :class="[isActive && 'link-active']"
            size="30px"
            color="#69686F"
            class="btn__icon"
            >mdi-home-variant-outline</v-icon
          >
          home
        </v-btn>
      </router-link>
      <router-link to="/search" custom v-slot="{ href, isActive }">
        <v-btn
          :class="[isActive && 'btn-active']"
          :href="href"
          class="navigation__btn"
        >
          <v-icon
            :class="[isActive && 'link-active']"
            size="30px"
            color="#69686F"
            class="btn__icon"
            >mdi-magnify</v-icon
          >
          search
        </v-btn>
      </router-link>
      <router-link to="/library" custom v-slot="{ href, isActive }">
        <v-btn
          :class="[isActive && 'btn-active']"
          :href="href"
          class="navigation__btn"
        >
          <v-icon
            :class="[isActive && 'link-active']"
            size="30px"
            color="#69686F"
            class="btn__icon"
            >mdi-bookmark-outline</v-icon
          >
          library
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import AudioPlayer from "@/components/AudioPlayer";

export default {
  name: "App",
  components: { AudioPlayer },

  data: () => ({}),
};
</script>

<style scoped>
.link-active {
  color: #fd516b !important;
}

.navigation__btn {
  color: #69686f;
}

.btn-active {
  color: #fd516b;
}

.card {
  z-index: 10;
}

.title {
  color: #fff;
}

.main {
  overflow: auto;
}

html {
  overflow: auto;
}
</style>
<style>
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #ffb6c1;
}

::-webkit-scrollbar-thumb {
  background-color: #fe7e91;
}
</style>
