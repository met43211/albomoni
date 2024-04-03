import { Header } from '@albomoni/widgets/header';

type Props = {
  children: React.ReactNode;
  params: { lng: string };
};

export default function HeaderLayout({ children, params: { lng } }: Props) {
  return (
    <>
      <Header lang={lng} />
      {children}
    </>
  );
}
