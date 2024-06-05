'use client';

import { useRef } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Button } from '@nextui-org/button';
import { scrollLeft, scrollRight } from './lib/scroll';

interface Props {
  children: React.ReactNode;
}

export const CategoriesContainer = ({ children }: Props) => {
  const slideRef = useRef<HTMLElement | null>(null);
  const scrollToStart = () => {
    scrollLeft(slideRef);
  };
  const scrollToEnd = () => {
    scrollRight(slideRef);
  };
  return (
    <div className='w-full flex flex-col max-w-7xl gap-8'>
      <div className='w-full flex justify-between'>
        <h2 className='text-xl md:text-2xl font-bold px-4'>Категории</h2>
        <div className='flex'>
          <Button
            className='mr-2'
            onPress={scrollToStart}
            isIconOnly
            radius='full'
          >
            {'<-'}
          </Button>
          <Button onPress={scrollToEnd} isIconOnly radius='full'>
            {'->'}
          </Button>
        </div>
      </div>
      <ScrollShadow
        orientation='horizontal'
        hideScrollBar
        className='grid grid-flow-col grid-rows-2 sm:flex sm:flex-row gap-4 py-1 px-4 overflow-y-hidden'
        ref={slideRef}
      >
        {children}
      </ScrollShadow>
    </div>
  );
};
