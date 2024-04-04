/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar } from '@nextui-org/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { PiUserBold } from 'react-icons/pi';
import { LogoutButton } from './logout-button';

export const UserAvatar = () => {
  return (
    <Popover
      placement='bottom'
      offset={20}
      classNames={{ trigger: 'cursor-pointer' }}
    >
      <PopoverTrigger>
        <Avatar
          isBordered
          icon={<PiUserBold size={24} className='opacity-50' />}
          className='w-10 h-10 flex-shrink-0'
          classNames={{ base: 'ring-black/10 dark:ring-white/10 ring-[3px] ring-offset-[3px]' }}
        />
      </PopoverTrigger>
      <PopoverContent className='w-40 p-1'>
        <div className='w-full flex flex-col gap-2 px-1 py-1'>
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
