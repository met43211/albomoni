'use client';

import { Button } from '@nextui-org/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-96 h-full flex flex-col items-center justify-center text-center gap-4'>
      <h2>Произошла непредвиденная ошибка.</h2>
      <h6>Код: {error.name}</h6>
      <Button size='lg' color='primary' onClick={() => reset()}>
        Попробовать снова
      </Button>
    </div>
  );
}
