const API_URL_KEY = "https://api.api-ninjas.com/v1/randomword";
const headerOptions = {
  "X-Api-Key": "E3N2WXAat2QFRmZmvuX2KA==w8yObXZHwjaCBzg2",
};

export async function getRandomWord() {
  let url = API_URL_KEY;

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
