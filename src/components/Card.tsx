import { ICardProps } from "../types";

export function Card({ date, imageUrl }: ICardProps) {
  return (
    <div className="aspect-[4/5] flex flex-col gap-4 rounded-md border-2 p-2">
      <img
        className="rounded-md object-cover w-full h-full"
        src={imageUrl}
        alt=""
      />
      <div className="text-center font-bold text-lg">{date}</div>
    </div>
  );
}
