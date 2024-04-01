/* eslint-disable @typescript-eslint/naming-convention */
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { PopoverTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { User } from '@albomoni/shared/model/types/user.type';
import { Avatar } from '@nextui-org/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { PiUserBold } from 'react-icons/pi';
import { LogoutButton } from './logout-button';

export const UserAvatar = () => {
  const { user } = useSession();
  const { first_name, last_name } = user as User;

  return (
    <Popover
      motionProps={PopoverTransitionVariants}
      placement='bottom'
      offset={20}
      classNames={{ trigger: 'cursor-pointer' }}
    >
      <PopoverTrigger>
        <Avatar
          isBordered
          icon={<PiUserBold size={24} className='opacity-50' />}
          className='w-10 h-10 flex-shrink-0'
          classNames={{ base: 'ring-black/10 ring-[3px] ring-offset-[3px]' }}
        />
      </PopoverTrigger>
      <PopoverContent className='w-40'>
        <div className='w-full flex flex-col gap-2 px-1 py-2'>
          <div className='text-small font-bold'>
            {first_name} {last_name}
          </div>
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
