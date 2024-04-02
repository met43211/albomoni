import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(
  () => import('@albomoni/widgets/header').then((mod) => mod.Header),
  {
    loading: () => <header className='w-full h-32' />,
  },
);

type Props = {
  children: React.ReactNode;
  params: { lng: string };
};

export default function HeaderLayout({ children, params: { lng } }: Props) {
  return (
    <>
      <DynamicHeader lang={lng} />
      {children}
    </>
  );
}
