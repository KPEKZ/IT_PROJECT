import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";

export default createStore({
  state: {
    songs: [],
    albums: [],
    artists: [],
    songsIsLoading: false,
  },
  getters: {
    getSongs(state) {
      return state.songs;
    },
    getAlbums(state) {
      return state.albums;
    },
    getArtists(state) {
      return state.artists;
    },
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setSongsIsLoading(state, value) {
      state.songsIsLoading = value;
    },
  },
  actions: {
    fetchSongs({ commit }, query) {
      commit("setSongsIsLoading", true);
      getAllSongs(query)
        .then((res) => {
          const songs = res.data;
          const albums = songs?.map((song) => song.album);
          const artists = songs?.map((song) => song.artist);

          commit("setSongs", songs);
          commit("setAlbums", albums);
          commit("setArtists", artists);
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },
  },
  modules: {},
});
