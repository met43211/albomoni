import { Suspense } from 'react';

export const WelcomeBlock = () => {
  return (
    <Suspense
      fallback={
        <div className='w-full h-[410px] bg-neutral-100 dark:bg-neutral-900' />
      }
    >
      <div className='w-full h-[410px] bg-neutral-100 dark:bg-neutral-900' />
    </Suspense>
  );
};
