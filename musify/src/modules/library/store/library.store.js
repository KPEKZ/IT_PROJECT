export const libraryStore = {
  namespaced: true,
  state: {
    librarySongs: [],
    libraryAlbums: [],
    libraryArtists: [],
  },
  getters: {
    getLibrarySongs(state) {
      return state.librarySongs;
    },
    getLibraryAlbums(state) {
      return state.libraryAlbums;
    },
    getLibraryArtists(state) {
      return state.libraryArtists;
    },
  },
  mutations: {
    setLibrarySongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.librarySongs = songs;
    },
    setLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.libraryAlbums = albums;
    },
    setLibraryArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.libraryArtists = artists;
    },
    addLibrarySongs(state, songs) {
      if (!Array.isArray(songs)) return;
      state.librarySongs.push(...songs);
    },
    addLibraryAlbums(state, albums) {
      if (!Array.isArray(albums)) return;
      state.libraryAlbums.push(...albums);
    },
    addLibraryArtists(state, artists) {
      if (!Array.isArray(artists)) return;
      state.libraryArtists.push(...artists);
    },
    addLibraryAlbum(state, album) {
      state.libraryAlbums.push(album);
    },
    addLibrarySong(state, song) {
      state.librarySongs.push(song);
    },
    addLibraryArtist(state, artist) {
      state.libraryArtists.push(artist);
    },

    deleteSongFromLibrary(state, song) {
      const oldLibrarySongs = [...state.librarySongs];
      state.librarySongs = oldLibrarySongs.filter((s) => s.id !== song.id);
    },

    deleteAlbumFromLibrary(state, album) {
      const oldLibraryAlbums = [...state.libraryAlbums];
      state.libraryAlbums = oldLibraryAlbums.filter((s) => s.id !== album.id);
    },

    deleteArtistFromLibrary(state, artist) {
      const oldLibraryArtist = [...state.libraryArtists];
      state.libraryArtists = oldLibraryArtist.filter((s) => s.id !== artist.id);
    },
  },
  actions: {
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
  },
};
