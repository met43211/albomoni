import { Ad } from '@albomoni/entities/ad/model/ad.type';

type Props = {
  data: Ad;
  lng: string;
};

export const AdInfo = ({ data, lng }: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-md font-semibold opacity-50'>Характеристики</h3>
        {Object.entries(data.ad.additional).map(([key, value]) => (
          <h5
            key={key}
            className='w-full text-lg font-semibold select-text cursor-text'
          >
            <span className='opacity-70'>{key}: </span>
            {value}
          </h5>
        ))}
      </div>

      <div className='flex flex-col gap-2'>
        <h3 className='text-md font-semibold opacity-50'>Описание</h3>
        <h6 className='w-full font-medium select-text cursor-text'>
          {data.ad.description}
        </h6>
      </div>
    </div>
  );
};
