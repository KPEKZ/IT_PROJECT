<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation :elevation="0" class="navigation">
      <router-link to="home" custom v-slot="{ href, isActive }">
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
      <router-link to="search" custom v-slot="{ href, isActive }">
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
      <router-link to="library" custom v-slot="{ href, isActive }">
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
export default {
  name: "App",

  data: () => ({
    //
  }),
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
</style>
