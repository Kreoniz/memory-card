import { useEffect, useState } from "react";
import { getMarsRoverPhotos } from "./api";
import { IPhotos } from "./types";

export function App() {
  const [photos, setPhotos] = useState<IPhotos | null>(null);

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
        {photos ? <div>{JSON.stringify(photos)}</div> : <div>Loading...</div>}
      </div>
    </div>
  );
}
