const API_URL_KEY = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const headerOptions = {
  "X-RapidAPI-Key": "766c1525bcmsh5b22a2b3d2772aep1005eajsn156bd96a25b4",
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
};

export async function getAllSongsInArtist(id) {
  let url = API_URL_KEY + id + "/top?limit=100";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headerOptions,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
