import { AdPage } from '@albomoni/page/ad';

type Props = {
  params: {
    lng: string;
    adId: string;
  };
};

export default async function Ad({ params: { lng, adId } }: Props) {
  return <AdPage lng={lng} adId={adId} />;
}
