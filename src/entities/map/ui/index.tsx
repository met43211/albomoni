import GoogleMapReact from 'google-map-react';
import { MapConfig } from '../config/map-config';

type Props = {
  newLat: number | undefined;
  newLng: number | undefined;
};

export const Map = ({ newLat, newLng }: Props) => {
  const { zoom, lat, lng } = MapConfig;

  return (
    <div className='w-full aspect-square md:aspect-video rounded-2xl overflow-clip'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_KEY as string }}
        defaultCenter={{ lat, lng }}
        defaultZoom={zoom}
        center={newLat && newLng ? { lat: newLat, lng: newLng } : undefined}
      />
    </div>
  );
};
