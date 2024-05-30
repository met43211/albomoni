'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Dropdown } from '@albomoni/shared/ui/(inputs)/dropdown/ui';
import { FileLoaderList } from '@albomoni/shared/ui/file-loader-list';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export const ContactForm = () => {
  const { user } = useSession();
  const [email, setEmail] = useState('');
  const contactVariants = ['question', 'bug', 'feature', 'feedback', 'other'];
  const [selectedKey, setSelectedKey] = useState(new Set([contactVariants[0]]));
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <form className='w-full flex flex-col gap-8'>
      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Ваш адрес email</h5>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='lg'
          placeholder='Начните ввод'
        />
      </div>

      <div className='w-72 flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Как мы можем помочь?</h5>
        <Dropdown
          collection={contactVariants}
          selectedKeys={selectedKey}
          setSelectedKeys={setSelectedKey}
        />
      </div>

      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Ваше обращение</h5>
        <Textarea
          size='lg'
          placeholder='Подробно опишите то, о чём Вы хотите нам сообщить'
        />
      </div>

      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Вложения (Необязательно)</h5>
        <FileLoaderList
          fileList={attachments}
          setFileList={setAttachments}
          multiple
        />
      </div>

      <Button
        size='lg'
        color='primary'
        variant='shadow'
        type='submit'
        className='w-full md:w-fit font-medium'
      >
        Отправить
      </Button>
    </form>
  );
};
