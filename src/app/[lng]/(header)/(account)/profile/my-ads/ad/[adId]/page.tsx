import { MyAdPage } from '@albomoni/page/my-ad/ui';

type Props = {
  params: {
    lng: string;
    adId: string;
  };
};

export default async function Ad({ params: { lng, adId } }: Props) {
  return <MyAdPage lng={lng} adId={adId} />;
}
