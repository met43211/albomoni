export const SupportVideo = () => {
  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-8'>
      <div className='w-full aspect-video bg-default rounded-2xl' />
      <div className='w-full flex flex-col gap-4'>
        <h3 className='text-2xl font-semibold'>Нужна помощь?</h3>
        <p className='font-medium opacity-50'>
          Посмотрите короткий видеоролик об основных возможностях площадки
          Albomoni, чтобы узнать:
        </p>
        <ul className='w-full flex text-sm gap-2 flex-wrap'>
          <li className='font-medium bg-default p-2 px-4 rounded-xl w-fit'>
            Как создать аккаунт
          </li>
          <li className='font-medium bg-default p-2 px-4 rounded-xl w-fit'>
            Как добавить объявление на площадку
          </li>
          <li className='font-medium bg-default p-2 px-4 rounded-xl w-fit'>
            Как отредактировать существующее объявление
          </li>
        </ul>
      </div>
    </div>
  );
};
