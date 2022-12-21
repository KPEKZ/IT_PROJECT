export function saveSongLocal(song) {
  localStorage.setItem("song-" + song.id, JSON.stringify(song));
}

export function getSongLocal(songId) {
  return JSON.parse(localStorage.getItem("song-" + songId));
}

export function getAllSongsLocal() {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("song"))
    .map((key) => JSON.parse(localStorage.getItem(key)));
}

export function removeSongLocal(songId) {
  localStorage.removeItem("song-" + songId);
}

export function saveAlbumLocal(album) {
  localStorage.setItem("album-" + album.id, JSON.stringify(album));
}

export function getAlbumLocal(albumId) {
  return JSON.parse(localStorage.getItem("album-" + albumId));
}

export function getAlbumsLocal() {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("album"))
    .map((key) => JSON.parse(localStorage.getItem(key)));
}

export function removeAlbumLocal(artistId) {
  localStorage.removeItem("album-" + artistId);
}

export function saveArtistLocal(artist) {
  localStorage.setItem("artist-" + artist.id, JSON.stringify(artist));
}

export function getArtistLocal(artistId) {
  return JSON.parse(localStorage.getItem("artist-" + artistId));
}

export function getArtistsLocal() {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("artist"))
    .map((key) => JSON.parse(localStorage.getItem(key)));
}

export function removeArtistLocal(artistId) {
  localStorage.removeItem("artist-" + artistId);
}
