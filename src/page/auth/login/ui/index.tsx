import { LoginWidget } from '@albomoni/features/auth/login';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const LoginPage = () => {
  const navigate = useRouter();
  
  const handleClick = () => {
    navigate.push('/');
  };

  return (
    <main className='flex flex-col gap-6 items-center px-4 justify-center h-dvh'>
      <LoginWidget />
      <Button onPress={handleClick} radius='full' size='md' className=''>
        Вернуться на главную
      </Button>
    </main>
  );
};
