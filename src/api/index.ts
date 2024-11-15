const API = import.meta.env.VITE_API;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMarsRoverPhotos(
  rover: "curiosity" | "opportunity" | "spirit",
  count: number,
) {
  const page = Math.ceil(count / 25);

  const data = await fetch(
    `${API}/mars-photos/api/v1/rovers/${rover}/photos?page=${page}&sol=1000&api_key=${API_KEY}`,
  );

  return data;
}
