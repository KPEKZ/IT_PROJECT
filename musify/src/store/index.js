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
    libraryArtists: [],
    HomeSongs: [],
    HomeAlbums: [],
    HomeArtists: [],
    songsIsLoading: false,
    songsInListsLoading: false,
    nextSongs: 0,
    randomWord: "",
    currentSongDto: null,
    currentSongAudio: null,
    isPlaying: false,
    currentSongPos: 0,
    currentSongLocation: null,
    currentPlayQueue: [],
    errorLoad: null,
    startLoadError: null,
    errorLoadNext: null,
    songsViaApp: [],
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
    getCurrentSongAudio(state) {
      return state.currentSongAudio;
    },
    getIsPlaying(state) {
      return state.isPlaying;
    },
    getCurrentSongId(state) {
      return state.currentSongDto?.id;
    },
    getCurrentSongDto(state) {
      return state.currentSongDto;
    },
    getCurrentPlayQueue(state) {
      return state.currentPlayQueue;
    },
    getCurrentSongPos(state) {
      return state.currentSongPos;
    },
    getCurrentSongLocation(state) {
      return state.currentSongLocation;
    },
    getSongsIsLoading(state) {
      return state.songsIsLoading;
    },
    getSongsInListLoading(state) {
      return state.songsInListsLoading;
    },
    getErrorLoad(state) {
      return state.errorLoad;
    },
    getStartErrorLoad(state) {
      return state.startLoadError;
    },
    getNextErrorLoad(state) {
      return state.errorLoadNext;
    },
    getSongsViaApp(state) {
      return state.songsViaApp;
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
    setSongsInListLoading(state, value) {
      state.songsInListsLoading = value;
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
    addLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      const newAlbums = albums.map((album) => {
        const appId = Symbol.for("appId");
        return { ...album, [appId]: Math.random() };
      });
      state.libraryAlbums.push(...newAlbums);
    },
    addLibraryAlbum(state, album) {
      const appId = Symbol.for("appId");
      state.libraryAlbums.push({ ...album, [appId]: Math.random() });
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
      const newAlbums = artists.map((artist) => {
        const appId = Symbol.for("appId");
        return { ...artist, [appId]: Math.random() };
      });
      state.libraryArtists.push(...newAlbums);
    },
    addLibraryArtist(state, artist) {
      const appId = Symbol.for("appId");
      state.libraryArtists.push({ ...artist, [appId]: Math.random() });
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

    deleteArtistFromLibrary(state, artist) {
      const oldLibraryArtist = [...state.libraryArtists];
      const appId = Symbol.for("appId");
      state.libraryArtists = oldLibraryArtist.filter(
        (s) => s[appId] !== artist[appId]
      );
    },

    setCurrentSongAudio(state, songAudio) {
      state.currentSongAudio = songAudio;
    },

    setCurrentSongDto(state, songDto) {
      state.currentSongDto = songDto;
    },

    setIsPlaying(state, action) {
      if (typeof action !== "boolean") return;
      state.isPlaying = action;
    },

    setCurrentPlayQueue(state, location) {
      switch (location) {
        case "home":
          state.currentPlayQueue = [...state.HomeSongs];
          break;
        case "library":
          state.currentPlayQueue = [...state.librarySongs];
          break;
        case "search":
          state.currentPlayQueue = [...state.songs];
          break;
        default:
          state.currentPlayQueue = [];
          break;
      }
    },
    setCurrentSongPos(state, songRef) {
      state.currentSongPos = state.currentPlayQueue
        .slice()
        .map((song) => song.id)
        .indexOf(songRef.id);
    },

    setCurrentSongLocation(state, location) {
      state.currentSongLocation = location;
    },

    setErrorLoad(state, error) {
      state.errorLoad = error;
    },

    setStartErrorLoad(state, error) {
      state.startLoadError = error;
    },

    setNextErrorLoad(state, error) {
      state.errorLoadNext = error;
    },

    setSongsViaApp(state, songs) {
      if (!Array.isArray(songs)) return;

      state.songsViaApp = songs;
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

          if (res.error?.code === 4) {
            commit("setStartErrorLoad", res.error);
          } else {
            commit("setStartErrorLoad", null);
            commit("setSongsIsLoading", false);
          }
        })
        .finally(() => {});
    },
    fetchNextSongs({ commit, state }, query) {
      commit("setSongsInListLoading", true);

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

          if (res.error?.code === 4) {
            commit("setNextErrorLoad", res.error);
          } else {
            commit("setNextErrorLoad", null);
            commit("setSongsInListLoading", true);
          }
        })
        .finally(() => {});
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

          if (res.error?.code === 4) {
            commit("setErrorLoad", res.error);
          } else {
            commit("setErrorLoad", null);
            commit("setSongsIsLoading", false);
          }
        })
        .finally(() => {});
    },

    fetchRandomWord({ commit }) {
      getRandomWord().then((res) => {
        commit("setRandomWord", res.word);
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
    deleteFromLibraryArtist({ commit }, artist) {
      commit("deleteArtistFromLibrary", artist);
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
    setCurrentSongAudio({ commit }, songAudio) {
      commit("setCurrentSongAudio", songAudio);
    },

    setCurrentSongDto({ commit }, songDto) {
      commit("setCurrentSongDto", songDto);
    },

    setIsPlaying({ commit }, action) {
      commit("setIsPlaying", action);
    },

    setCurrentPlayQueue({ commit }, location) {
      commit("setCurrentPlayQueue", location);
    },

    setCurrentSongPos({ commit }, songDto) {
      commit("setCurrentSongPos", songDto);
    },

    setCurrentSongLocation({ commit }, location) {
      commit("setCurrentSongLocation", location);
    },

    setSongsIsLoading({ commit }, state) {
      commit("setSongsIsLoading", state);
    },

    setSongsIsListLoading({ commit }, state) {
      commit("setSongsIsLoading", state);
    },

    setErrorLoad({ commit }, state) {
      commit("setErrorLoad", state);
    },

    setStartErrorLoad({ commit }, state) {
      commit("setStartErrorLoad", state);
    },

    setNextErrorLoad({ commit }, state) {
      commit("setErrorLoad", state);
    },
  },
  modules: {},
});
