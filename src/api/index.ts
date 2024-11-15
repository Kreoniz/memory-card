const API = import.meta.env.VITE_API;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMarsRoverInfo() {
  const data = await fetch(
    `${API}/mars-photos/api/v1/rovers/curiosity/?api_key=${API_KEY}`,
  );

  return data;
}

export async function getMarsRoverPhotos(count: number, sol: number) {
  const page = Math.ceil(count / 25);

  const data = await fetch(
    `${API}/mars-photos/api/v1/rovers/curiosity/photos?page=${page}&sol=${sol}&api_key=${API_KEY}`,
  );

  return data;
}
