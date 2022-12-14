const API_URL_KEY = "https://deezerdevs-deezer.p.rapidapi.com/";
const headerOptions = {
  "X-RapidAPI-Key": "d5161370afmsheb9e90f835cdc0cp198544jsn489f6e24cf05",
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
};

export async function getAllSongs(query, next = 0) {
  if (typeof query !== "string") return;
  let url = API_URL_KEY + `search?q=${query}&index=${next}`;

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
