export const searchStore = {
  namespaced: true,

  state: {
    songs: [],
    albums: [],
    artists: [],
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
      if (!Array.isArray(songs)) return;
      state.songs = songs;
    },
    addSongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.songs.push(...songs);
    },
    setAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.albums = albums;
    },
    addAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.albums.push(...albums);
    },
    setArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.artists = artists;
    },
    addArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.artists.push(...artists);
    },
  },
  actions: {
    addSongs({ commit }, songs) {
      commit("addSongs", songs);
    },

    setAlbums({ commit }, albums) {
      commit("setAlbums", albums);
    },

    setArtists({ commit }, artists) {
      commit("setArtists", artists);
    },
  },
};
