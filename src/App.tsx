import { useEffect, useState } from "react";
import { getMarsRoverPhotos, getMarsRoverInfo } from "./api";
import { IPhoto } from "./types";
import { Card } from "./components/Card";
import { QuestionIcon, CrossIcon } from "./components/icons";

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        setPhotos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

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
    <div className="py-4 px-2 md:px-4 relative h-full w-full">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center">Rovertastic!</h2>

        <div className="font-bold flex gap-3 items-center">
          <div className="text-right">
            <div>Best score: {bestScore}</div>
            <div>Current score: {clickedItems.length}</div>
          </div>

          <button type="button" onClick={() => setIsModalOpen(true)}>
            <QuestionIcon height="45" width="45" />
          </button>
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

      <dialog
        open={isModalOpen}
        className="absolute min-w-screen w-full min-h-screen h-full bg-gray-950/60 top-0 left-0"
        id="modal"
      >
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="relative w-[320px] bg-white shadow-black rounded-2xl py-8 px-2">
            <h2 className="text-2xl font-bold text-center mb-2">Information</h2>

            <div className="flex flex-col gap-2 text-center">
              <p>
                You should click on a card you haven't clicked in the current
                round yet
              </p>
              <p>After each click the cards are shuffled!</p>
              <p>To win, you should click on all the cards</p>
            </div>

            <button
              className="absolute top-0 right-0 p-6"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              <CrossIcon height="40" width="40" />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
