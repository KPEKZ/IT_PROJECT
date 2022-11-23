import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";

export default createStore({
  state: {
    songs: [],
    albums: [],
    songsIsLoading: false,
  },
  getters: {
    getSongs(state) {
      return state.songs;
    },
    getAlbums(state) {
      return state.albums;
    },
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
    },
    setAlbums(state, albums) {
      state.albums = albums;
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

          commit("setSongs", songs);
          commit("setAlbums", albums);
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },
  },
  modules: {},
});
