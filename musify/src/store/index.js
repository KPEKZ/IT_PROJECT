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
    randomWord: "",
    libraryArtists: [],
    currentSong: null,
    currentSongId: null,
    isPlaying: false,
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
    getLibraryArtists(state) {
      return state.libraryArtists;
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
    getCurrentSong(state) {
      return state.currentSong;
    },
    getIsPlaying(state) {
      return state.isPlaying;
    },
    getCurrentSongId(state) {
      return state.currentSongId;
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
      state.librarySongs = songs.map((song) => {
        const appId = Symbol.for("appId");
        return { ...song, [appId]: Math.random() };
      });
    },
    setLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.libraryAlbums = albums.map((album) => {
        const appId = Symbol.for("appId");
        return { ...album, [appId]: Math.random() };
      });
    },
    addLibraryAlbum(state, album) {
      const appId = Symbol.for("appId");
      state.libraryAlbums.push({ ...album, [appId]: Math.random() });
    },
    addLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      const newAlbums = albums.map((album) => {
        const appId = Symbol.for("appId");
        return { ...album, [appId]: Math.random() };
      });
      state.libraryAlbums.push(...newAlbums);
    },
    addLibrarySongs(state, songs) {
      if (!Array.isArray(songs)) return;
      const newSongs = songs.map((song) => {
        const appId = Symbol.for("appId");
        return { ...song, [appId]: Math.random() };
      });
      state.librarySongs.push(...newSongs);
    },
    addLibrarySong(state, song) {
      const appId = Symbol.for("appId");
      state.librarySongs.push({ ...song, [appId]: Math.random() });
    },
    setLibraryArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.libraryArtists = artists;
    },
    addLibraryArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.libraryArtists.push(...artists);
    },
    addLibraryArtist(state, artist) {
      state.libraryArtists.push(artist);
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
    deleteSongFromLibrary(state, song) {
      const oldLibrarySongs = [...state.librarySongs];
      const appId = Symbol.for("appId");
      state.librarySongs = oldLibrarySongs.filter(
        (s) => s[appId] !== song[appId]
      );
    },
    deleteAlbumFromLibrary(state, album) {
      const oldLibraryAlbums = [...state.libraryAlbums];
      const appId = Symbol.for("appId");
      state.libraryAlbums = oldLibraryAlbums.filter(
        (s) => s[appId] !== album[appId]
      );
    },
    setCurrentSong(state, song) {
      state.currentSong = song;
    },

    setIsPlaying(state, action) {
      if (typeof action !== "boolean") return;
      state.isPlaying = action;
    },

    setCurrentSongId(state, id) {
      state.currentSongId = id;
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

      if (query.length <= 1) query = this.state.randomWord;

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
    deleteFromLibrarySong({ commit }, song) {
      commit("deleteSongFromLibrary", song);
    },
    deleteFromLibraryAlbum({ commit }, album) {
      commit("deleteAlbumFromLibrary", album);
    },
    addLibraryAlbums({ commit }, albums) {
      commit("addLibraryAlbums", albums);
    },
    setLibraryArtists({ commit }, artists) {
      commit("setLibraryArtists", artists);
    },
    addLibraryArtists({ commit }, artists) {
      commit("addLibraryArtists", artists);
    },
    addLibraryArtist({ commit }, artist) {
      commit("addLibraryArtist", artist);
    },
    setNextSongs({ commit }, next) {
      commit("setNextSongs", next);
    },
    setCurrentSong({ commit }, song) {
      commit("setCurrentSong", song);
    },
    setIsPlaying({ commit }, action) {
      commit("setIsPlaying", action);
    },

    setCurrentSongId({ commit }, id) {
      commit("setCurrentSongId", id);
    },
  },
  modules: {},
});
