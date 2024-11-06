import { createStore } from "vuex";
import { getAllSongs } from "@/services/SongService";
import { getRandomWord } from "@/services/RandomWordService";
import { homeStore } from "@/modules/home/store/home.store";
import { libraryStore } from "@/modules/library/store/library.store";
import { searchStore } from "@/modules/search/store/search.store";

export default createStore({
  state: {
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
    getNextSongs(state) {
      return state.nextSongs;
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
    setSongsIsLoading(state, value) {
      state.songsIsLoading = value;
    },
    setSongsInListLoading(state, value) {
      state.songsInListsLoading = value;
    },
    setNextSongs(state, next) {
      if (next !== null || undefined) state.nextSongs += next;
    },
    setRandomWord(state, randomWord) {
      state.randomWord = randomWord;
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
          state.currentPlayQueue = [...state.home.HomeSongs];
          break;
        case "library":
          state.currentPlayQueue = [...state.library.librarySongs];
          break;
        case "search":
          state.currentPlayQueue = [...state.search.songs];
          break;
        case "album":
          state.currentPlayQueue = [...state.songsViaApp];
          break;
        case "artist":
          state.currentPlayQueue = [...state.songsViaApp];
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

          commit("search/setSongs", songs);
          commit("search/setAlbums", albums);
          commit("search/setArtists", artists);
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

          commit("search/addSongs", songs);
          commit("search/addAlbums", albums);
          commit("search/addArtists", artists);
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

          commit("home/setHomeSongs", songs);
          commit("home/setHomeAlbums", albums);
          commit("home/setHomeArtists", artists);

          if (
            res.error?.code ||
            res.data.length === 0 ||
            res.data?.total === 0
          ) {
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

    setSongsViaApp({ commit }, songs) {
      commit("setSongsViaApp", songs);
    },
  },
  modules: {
    home: homeStore,
    library: libraryStore,
    search: searchStore,
  },
});
