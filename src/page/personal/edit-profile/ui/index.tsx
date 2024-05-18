import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { EditAvatar } from './avatar';
import { EditPhoneNumbers } from './phone-numbers';
import { EditName } from './name';

export const EditProfilePage = () => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Управление профилем
        </h2>
        <div className='w-full lg:w-1/2 flex flex-col gap-12'>
          <Button
            size='lg'
            color='primary'
            as={Link}
            href='/user/2'
            className='-mt-2 -mb-3 font-medium'
          >
            Посмотреть мой профиль
          </Button>
          <EditAvatar url={null} />
          <EditName name='Михаил' />
          <EditPhoneNumbers
            numbers={[
              { number: '+79320505497', title: 'Личный' },
              { number: '+79660534662', title: 'Рабочий' },
            ]}
          />
        </div>
      </div>
    </main>
  );
};
