import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";
import { getRandomWord } from "@/services/RandomWordService";

export default createStore({
  state: {
    songs: [],
    albums: [],
    artists: [],
    librarySongs: [],
    libraryAlbums: [],
    HomeSongs: [],
    HomeAlbums: [],
    HomeArtists: [],
    songsIsLoading: false,
    nextSongs: 0,
    randomWord: "Ivan",
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
    getNextSongs(state) {
      return state.nextSongs;
    },
    getHomeSongs(state) {
      return state.HomeSongs;
    },
    getHomeAlbums(state) {
      return state.HomeAlbums;
    },
    getHomeArtists(state) {
      return state.HomeArtists;
    },
    getRandomWord(state) {
      return state.randomWord;
    },
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
    },
    addSongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.songs.push(...songs);
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    addAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.albums.push(...albums);
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    addArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.artists.push(...artists);
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
    setNextSongs(state, next) {
      if (next !== null || undefined) state.nextSongs += next;
    },
    setHomeSongs(state, songs) {
      state.HomeSongs = songs;
    },
    addHomeSongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.HomeSongs.push(...songs);
    },
    setHomeAlbums(state, albums) {
      state.HomeAlbums = albums;
    },
    addHomeAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.HomeAlbums.push(...albums);
    },
    setHomeArtists(state, artists) {
      state.HomeArtists = artists;
    },
    addHomeArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.HomeArtists.push(...artists);
    },
    setRandomWord(state, randomWord) {
      state.randomWord = randomWord;
    },
  },
  actions: {
    fetchInitSongs({ commit }, query) {
      commit("setSongsIsLoading", true);
      getAllSongs(query)
        .then((res) => {
          const songs = res.data;
          const albums = songs?.map((song) => song.album);
          const artists = songs?.map((song) => song.artist);

          commit("setSongs", songs);
          commit("setAlbums", albums);
          commit("setArtists", artists);
          if (res.next) {
            commit("setNextSongs", 25);
          }
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },
    fetchNextSongs({ commit, state }, query) {
      commit("setSongsIsLoading", true);

      getAllSongs(query, state.nextSongs)
        .then((res) => {
          const songs = res.data;
          const albums = songs?.map((song) => song.album);
          const artists = songs?.map((song) => song.artist);

          commit("addSongs", songs);
          commit("addAlbums", albums);
          commit("addArtists", artists);
          if (res.next) {
            commit("setNextSongs", 25);
          }
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },
    fetchInitHomeSongs({ commit }, query) {
      commit("setSongsIsLoading", true);

      getAllSongs(query)
        .then((res) => {
          const songs = res.data;
          const albums = songs?.map((song) => song.album);
          const artists = songs?.map((song) => song.artist);

          commit("setHomeSongs", songs);
          commit("setHomeAlbums", albums);
          commit("setHomeArtists", artists);
        })
        .finally(() => {
          commit("setSongsIsLoading", false);
        });
    },

    fetchRandomWord({ commit }) {
      getRandomWord().then((res) => {
        const randomWord = res.toString();
        commit("setRandomWord", randomWord);
      });
    },

    addSongs({ commit }, songs) {
      commit("addSongs", songs);
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
    setNextSongs({ commit }, next) {
      commit("setNextSongs", next);
    },
  },
  modules: {},
});
