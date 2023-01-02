import { PROXY_URL } from "@/configs/proxy-url";
import { DEEZER_URL } from "@/configs/deezer-url";

const SONG_URL_KEY = `${PROXY_URL}/${DEEZER_URL}/search`;

export async function getAllSongs(query, next = 0) {
  if (typeof query !== "string") return;
  const url = SONG_URL_KEY + `?q=${query}&index=${next}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
