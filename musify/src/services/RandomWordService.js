const API_URL_KEY = "https://random-word-api.herokuapp.com/word";

export async function getRandomWord() {
  let url = API_URL_KEY;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
