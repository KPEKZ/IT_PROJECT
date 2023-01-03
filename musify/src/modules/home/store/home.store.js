export const homeStore = {
  namespaced: true,
  state: {
    HomeSongs: [],
    HomeAlbums: [],
    HomeArtists: [],
  },
  getters: {
    getHomeSongs(state) {
      return state.HomeSongs;
    },
    getHomeAlbums(state) {
      return state.HomeAlbums;
    },
    getHomeArtists(state) {
      return state.HomeArtists;
    },
  },
  mutations: {
    setHomeSongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.HomeSongs = songs;
    },
    addHomeSongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.HomeSongs.push(...songs);
    },
    setHomeAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.HomeAlbums = albums;
    },
    addHomeAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.HomeAlbums.push(...albums);
    },
    setHomeArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.HomeArtists = artists;
    },
    addHomeArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.HomeArtists.push(...artists);
    },
  },
  actions: {
    setHomeSongs({ commit }, songs) {
      commit("setHomeSongs", songs);
    },
    addHomeSongs({ commit }, songs) {
      commit("addHomeSongs", songs);
    },
    setHomeAlbums({ commit }, albums) {
      commit("setHomeAlbums", albums);
    },
    addHomeAlbums({ commit }, albums) {
      commit("addHomeAlbums", albums);
    },
    setHomeArtists({ commit }, artists) {
      commit("setHomeArtists", artists);
    },
    addHomeArtists({ commit }, artists) {
      commit("addHomeArtists", artists);
    },
  },
};
