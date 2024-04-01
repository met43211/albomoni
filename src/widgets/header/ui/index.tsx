import { StaticBar } from './static-bar';
import { StickyBar } from './sticky-bar';

type Props = {
  lang: string;
};

export const Header = ({ lang }: Props) => {
  return (
    <header className='w-full h-32 flex flex-col items-center z-30'>
      <StaticBar lang={lang} />
      <StickyBar />
    </header>
  );
};
