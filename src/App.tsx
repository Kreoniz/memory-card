import { useEffect, useState } from "react";
import { getMarsRoverPhotos, getMarsRoverInfo } from "./api";
import { IPhoto } from "./types";
import { Card } from "./components/Card";

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);

  const CARD_AMOUNT = 10;
  useEffect(() => {
    async function fetchData() {
      try {
        const roverInfoRes = await getMarsRoverInfo();
        const roverInfo = await roverInfoRes.json();

        const maxSol = roverInfo.rover.max_sol;
        const randomSol = Math.floor(Math.random() * maxSol);

        const photosRes = await getMarsRoverPhotos(CARD_AMOUNT, randomSol);
        const photos = await photosRes.json();

        const data = photos.photos.slice(0, CARD_AMOUNT);
        setPhotos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="py-4 px-2 md:px-4">
      <div className="text-3xl font-bold mb-4 text-center">Rovertastic!</div>
      <div>
        {photos ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                imageUrl={photo.img_src}
                date={photo.earth_date}
              />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
