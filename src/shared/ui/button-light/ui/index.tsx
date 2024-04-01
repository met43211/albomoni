type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const ButtonLight = ({ children, onClick }: Props) => (
  <button
    type='button'
    className='flex gap-2 opacity-50 items-center cursor-pointer hover:opacity-100 hover:text-[--accent] active:scale-95 transition-all'
    onClick={onClick}
  >
    {children}
  </button>
);
