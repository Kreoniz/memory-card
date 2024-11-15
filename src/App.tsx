import { useEffect, useState } from "react";
import { getMarsRoverPhotos } from "./api";
import { IPhoto } from "./types";
import { Card } from "./components/Card";

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);

  const CARD_AMOUNT = 10;
  const rover_name = "curiosity";
  useEffect(() => {
    getMarsRoverPhotos(rover_name, CARD_AMOUNT)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(data.photos.slice(10));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="text-xl font-bold">App</div>
      <div>
        {photos ? (
          <div className="grid grid-cols-4 gap-4">
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
