export const AdCardDesktop = () => {
  return (
    <div className='w-full flex-shrink-0 flex flex-col gap-4'>
      <div className='w-full aspect-[3/2] bg-[--element] rounded-lg' />
      <div className='w-full flex flex-col gap-2'>
        <div className='w-full h-6 bg-[--element] rounded-lg' />
        <div className='w-36 h-4 bg-[--element] rounded-lg' />
        <div className='w-24 h-4 bg-[--element] rounded-lg' />
      </div>
    </div>
  );
};
