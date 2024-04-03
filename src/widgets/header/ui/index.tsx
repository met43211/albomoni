import { Suspense } from 'react';
import { TopBar } from './top-bar';
import { BottomBar } from './bottom-bar';

type Props = {
  lang: string;
};

export const Header = ({ lang }: Props) => {
  return (
    <header className='w-full h-32 flex flex-col items-center z-30'>
      <TopBar lang={lang} />
      <Suspense>
        <BottomBar />
      </Suspense>
    </header>
  );
};
