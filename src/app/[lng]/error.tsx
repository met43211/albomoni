'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className='min-h-96 h-full flex flex-col items-center justify-center text-center gap-4'>
      <h2>Произошла непредвиденная ошибка.</h2>
      <h6>Код: {error.name}</h6>
      <Button
        size='lg'
        color='primary'
        className='w-80'
        onClick={() => reset()}
      >
        Попробовать снова
      </Button>
      <Button size='lg' className='w-80' onClick={() => router.push('/')}>
        На главную
      </Button>
    </div>
  );
}
