import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";

export default createStore({
  state: {
    songs: [],
    albums: [],
    artists: [],
    librarySongs: [],
    libraryAlbums: [],
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
    getLibrarySongs(state) {
      return state.librarySongs;
    },
    getLibraryAlbums(state) {
      return state.libraryAlbums;
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
    setLibrarySongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.librarySongs = songs;
    },
    setLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.libraryAlbums = albums;
    },
    addLibraryAlbum(state, album) {
      state.librarySongs.push(album);
    },
    addLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.librarySongs.push(...albums);
    },
    addLibrarySongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.librarySongs.push(...songs);
    },
    addLibrarySong(state, song) {
      state.librarySongs.push(song);
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
    setLibrarySongs({ commit }, songs) {
      commit("setLibrarySongs", songs);
    },
    setLibraryAlbums({ commit }, albums) {
      commit("setLibraryAlbums", albums);
    },
    addLibrarySong({ commit }, song) {
      commit("addLibrarySong", song);
    },
    addLibraryAlbum({ commit }, album) {
      commit("addLibraryAlbum", album);
    },
    addLibrarySongs({ commit }, songs) {
      commit("addLibrarySongs", songs);
    },
    addLibraryAlbums({ commit }, albums) {
      commit("addLibraryAlbums", albums);
    },
  },
  modules: {},
});
