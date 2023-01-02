import { PROXY_URL } from "@/configs/proxy-url";
import { DEEZER_URL } from "@/configs/deezer-url";

const ARTIST_URL_KEY = `${PROXY_URL}/${DEEZER_URL}/artist/`;

export async function getAllSongsInArtist(id) {
  const url = ARTIST_URL_KEY + id + "/top";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
