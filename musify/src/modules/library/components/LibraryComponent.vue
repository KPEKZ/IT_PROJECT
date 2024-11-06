<template>
  <v-container class="container">
    <template v-if="albums.length > 0">
      <v-row> <h3 class="header">Albums</h3></v-row>
      <v-row class="row row__theme_default rounded-lg">
        <AlbumsList :albums="getAlbums"></AlbumsList>
      </v-row>
    </template>

    <template v-if="artists.length > 0">
      <v-row> <h3 class="header">Artists</h3></v-row>
      <v-row class="row row__theme_default rounded-lg">
        <section class="songs">
          <ArtistsList :artists="getArtists"></ArtistsList>
        </section>
      </v-row>
    </template>
    <template v-if="songs.length > 0">
      <v-row> <h3 class="header">Songs</h3></v-row>
      <v-row class="row row__theme_default rounded-lg">
        <section class="songs">
          <SongsList
            :songs="getSongs"
            :canAddToLibrary="false"
            location="library"
          ></SongsList>
        </section>
      </v-row>
    </template>
    <template v-if="songs.length === 0">
      <v-row class="row row__theme_active rounded">
        <v-alert class="alert" icon="mdi-music">
          No songs yet. Add the songs through search or home page
        </v-alert>
      </v-row>
    </template>
    <template v-if="albums.length === 0">
      <v-row class="row row__theme_active rounded">
        <v-alert class="alert" icon="mdi-music-box-outline">
          No Albums yet. Add the albums through search or home page
        </v-alert>
      </v-row>
    </template>
    <template v-if="artists.length === 0">
      <v-row class="row row__theme_active rounded">
        <v-alert class="alert" icon="mdi-account-music-outline">
          No artists yet. Add the artists through search or home page
        </v-alert>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import SongsList from "@/components/SongsList";
import AlbumsList from "@/components/AlbumsList";
import ArtistsList from "@/components/ArtistsList";
import {
  getAlbumsLocal,
  getAllSongsLocal,
  getArtistsLocal,
} from "@/services/LocalStorage";
import { mapGetters } from "vuex";

export default {
  name: "LibraryComponent",
  data() {
    return {
      albums: [],
      songs: [],
      artists: [],
    };
  },

  components: {
    SongsList,
    AlbumsList,
    ArtistsList,
  },

  computed: {
    ...mapGetters({
      getSongs: "library/getLibrarySongs",
      getAlbums: "library/getLibraryAlbums",
      getArtists: "library/getLibraryArtists",
    }),
  },

  watch: {
    getAlbums: function (newAlbums) {
      this.albums = newAlbums;
    },

    getArtists: function (newArtists) {
      this.artists = newArtists;
    },

    getSongs: function (newSongs) {
      console.log(newSongs);
      this.songs = newSongs;
    },
  },

  mounted() {
    this.albums = getAlbumsLocal();
    this.songs = getAllSongsLocal();
    this.artists = getArtistsLocal();

    this.$store.dispatch("library/setLibrarySongs", this.songs);
    this.$store.dispatch("library/setLibraryAlbums", this.albums);
    this.$store.dispatch("library/setLibraryArtists", this.artists);
  },
};
</script>

<style scoped>
.albums {
  display: flex;
  overflow: auto;
  gap: 20px;
}

.row {
  margin: 0;
}

.row__theme_default {
  box-shadow: 0 0 3px 1px rgba(34, 60, 80, 0.2);
}

.row__theme_active {
  box-shadow: 0px 0px 3px 1px rgba(253, 81, 107, 0.2);
}

.header {
  color: #69686f;
  margin-left: 70px;
  margin-top: 20px;
}

.songs {
  width: 100%;
}

.container {
  display: flex;
  gap: 20px;
  flex-flow: column;
  padding: 50px 0 50px 0;
}

.alert {
  background-color: transparent;
  color: #fd516b;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #ffb6c1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #fe7e91;
  border-radius: 5px;
}
</style>
