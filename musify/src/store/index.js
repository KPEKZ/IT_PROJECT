import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";

export default createStore({
  state: {
    songs: [],
    songsIsLoading: false,
  },
  getters: {
    getSongs(state) {
      return state.songs;
    },
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
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
          commit("setSongs", res.data);
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },
  },
  modules: {},
});
