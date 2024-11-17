import { useEffect, useState } from "react";
import { getMarsRoverPhotos, getMarsRoverInfo } from "./api";
import { IPhoto } from "./types";
import { Card } from "./components/Card";

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const [bestScore, setBestScore] = useState(0);

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

        const shuffledPhotos = shuffle(photos.photos);

        const data = shuffledPhotos
          .slice(0, CARD_AMOUNT)
          .map((photo: IPhoto) => ({ ...photo, wasClicked: false }));

        console.log(JSON.stringify(data, null, 2));
        setPhotos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function shuffle(array: IPhoto[] | null) {
    if (!array) return [];

    let currentIndex = array.length;
    const newArray = array.slice();

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }

    return newArray;
  }

  function handleItemClick(id: number) {
    if (clickedItems.find((clickedId) => clickedId === id)) {
      setBestScore(Math.max(clickedItems.length, bestScore));
      setClickedItems([]);
    } else {
      setClickedItems([...clickedItems, id]);

      setPhotos(shuffle(photos));
    }
  }

  return (
    <div className="py-4 px-2 md:px-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center">Rovertastic!</h2>

        <div className="font-bold">
          <div>Best score: {bestScore}</div>
          <div>Current score: {clickedItems.length}</div>
        </div>
      </header>

      <div>
        {photos ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {photos.map((photo) => (
              <button
                type="button"
                onClick={() => handleItemClick(photo.id)}
                key={photo.id}
              >
                <Card
                  imageUrl={photo.img_src}
                  date={photo.earth_date}
                  camera={photo.camera.full_name}
                />
              </button>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
