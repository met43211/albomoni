import { Ad } from '@albomoni/entities/ad/model/ad.type';

type Props = {
  data: Ad;
  lng: string;
};

export const AdInfo = ({ data, lng }: Props) => {
  return (
    <div>
      <div className='w-1 h-[600px]' />
    </div>
  );
};
