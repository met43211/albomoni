import { UserAvatar } from '@albomoni/entities/user';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

export const ModalVariantSubscription = () => {
  const { user } = useSession();
  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <ScrollShadow
        hideScrollBar
        className='w-full h-full max-h-[500px] flex flex-col gap-5 items-center p-8 flex-shrink'
      >
        <div className='w-32 h-32'>
          <UserAvatar src={user?.avatar as string} isSubscribed isBig />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-red-500 inline-block text-transparent bg-clip-text'>
            Albomoni Pro
          </h1>
          <h2 className='text-lg text-white opacity-50 font-medium'>
            Получите больше с единой подпиской.
          </h2>
        </div>
        <div className='w-1 h-[700px] flex-shrink-0' />
      </ScrollShadow>

      <div className='w-full flex items-center justify-center flex-shrink-0 p-6'>
        <Button
          size='lg'
          className='w-full bg-gradient-to-r to-indigo-700 from-red-500 font-medium text-white'
        >
          Оформить за 35$ в месяц
        </Button>
      </div>
    </div>
  );
};
