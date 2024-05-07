import { AdsListSkeleton } from '@albomoni/widgets/ads-list/ui/skeleton';
import dynamic from 'next/dynamic';

type Props = {
  lng: string;
  favoritesId: string;
};

const DynamicFavoritesList = dynamic(
  () => import('./favorites').then((mod) => mod.FavoritesList),
  { loading: () => <AdsListSkeleton /> },
);

export const FavoritePage = async ({ lng, favoritesId }: Props) => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <DynamicFavoritesList favoritesId={favoritesId} lng={lng} />
      </div>
    </main>
  );
};
