import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";

export default createStore({
  state: {
    songs: [],
    albums: [],
    artists: [],
    librarySongs: [],
    libraryAlbums: [],
    libraryArtists: [],
    songsIsLoading: false,
    nextSongs: 0,
    currentSong: null,
    currentSongId: null,
    isPlaying: false,
    currentSongRef: null,
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
    getCurrentSong(state) {
      return state.currentSong;
    },
    getIsPlaying(state) {
      return state.isPlaying;
    },
    getCurrentSongId(state) {
      return state.currentSongId;
    },
    getCurrentSongRef(state) {
      return state.currentSongRef;
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
    deleteSongFromLibrary(state, song) {
      const oldLibrarySongs = [...state.librarySongs];
      const appId = Symbol.for("appId");
      state.librarySongs = oldLibrarySongs.filter(
        (s) => s[appId] !== song[appId]
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
    setCurrentSongRef(state, song) {
      state.currentSongRef = song;
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

    setCurrentSongRef({ commit }, song) {
      commit("setCurrentSongRef", song);
    },
  },
  modules: {},
});
