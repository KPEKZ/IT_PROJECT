import { PROXY_URL } from "@/configs/proxy-url";
import { DEEZER_URL } from "@/configs/deezer-url";

const ALBUM_URL_KEY = `${PROXY_URL}/${DEEZER_URL}/album/`;

export async function getAllSongsInAlbum(id) {
  let url = ALBUM_URL_KEY + id;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
