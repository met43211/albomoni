import { clsx } from 'clsx';

type Props = {
  children: React.ReactNode;
  type?: 'default' | 'error';
};

export const NotificationBubble = ({ children, type = 'default' }: Props) => {
  const bubbleStyles = clsx(
    'w-full px-4 py-3 rounded-xl text-sm bg-opacity-10',
    {
      'bg-[--element]': type === 'default',
      'bg-red-500  text-red-500': type === 'error',
    },
  );

  return <div className={bubbleStyles}>{children}</div>;
};
