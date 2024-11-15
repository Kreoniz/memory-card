interface ICamera {
  id?: number;
  name: string;
  rover_id?: number;
  full_name: string;
}

interface IRover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: ICamera[];
}

export interface IPhoto {
  id: number;
  sol: number;
  camera: ICamera;
  img_src: string;
  earth_date: string;
  rover: IRover;
}

export interface ICardProps {
  imageUrl: string;
  date: string;
}
