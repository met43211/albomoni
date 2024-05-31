'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Dropdown } from '@albomoni/shared/ui/(inputs)/dropdown/ui';
import { FileLoaderList } from '@albomoni/shared/ui/file-loader-list';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { postContactInfo } from '@albomoni/widgets/api/post-contact-info';
import { ContactVariants } from '../config/contact-variants';
import { validator } from '../lib/validator';
import { ContactFormDataI } from '../model/contact-form-data';

export const ContactForm = () => {
  const { user } = useSession();
  const [email, setEmail] = useState('');
  const [appeal, setAppeal] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidAppeal, setIsValidAppeal] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedContactVariant, setSelectedContactVariant] = useState(
    new Set([ContactVariants[0]]),
  );
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const resetForm = () => {
    setEmail('');
    setAppeal('');
    setSelectedContactVariant(new Set([ContactVariants[0]]));
    setAttachments([]);
  };

  const send = async (data: ContactFormDataI) => {
    try {
      await postContactInfo(data);
      setIsSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const selectedVariant = selectedContactVariant.values().next().value;
    const formData = {
      email,
      selectedContactVariant: selectedVariant,
      appeal,
      attachments: attachments.length ? attachments[0] : null,
    };

    validator(formData).then(([isEmail, isAppeal]) => {
      setIsValidEmail(isEmail);
      setIsValidAppeal(isAppeal);
      if (isEmail && isAppeal) {
        resetForm();
        send(formData);
      }
    });
  };

  return (
    <form
      className='w-full flex flex-col gap-8'
      onSubmit={handleSubmit}
      action='submit'
    >
      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Ваш адрес email</h5>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='lg'
          placeholder='Начните ввод'
        />
      </div>
      {!isValidEmail && (
        <div className='w-full max-w-[700px]'>
          <NotificationBubble type='error'>
            Некорректный Email
          </NotificationBubble>
        </div>
      )}
      <div className='w-72 flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Как мы можем помочь?</h5>
        <Dropdown
          collection={ContactVariants}
          selectedKeys={selectedContactVariant}
          setSelectedKeys={setSelectedContactVariant}
        />
      </div>

      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Ваше обращение</h5>
        <Textarea
          size='lg'
          value={appeal}
          onChange={(e) => setAppeal(e.target.value)}
          placeholder='Подробно опишите то, о чём Вы хотите нам сообщить'
        />
      </div>
      {!isValidAppeal && (
        <div className='w-full max-w-[700px]'>
          <NotificationBubble type='error'>
            Слишком коротое обращение
          </NotificationBubble>
        </div>
      )}
      <div className='w-full max-w-[700px] flex flex-col gap-3'>
        <h5 className='font-medium opacity-50'>Вложения (Необязательно)</h5>
        <FileLoaderList
          fileList={attachments}
          setFileList={setAttachments}
          multiple
        />
      </div>
      {isSuccess && (
        <div className='w-full max-w-[700px]'>
          <NotificationBubble>Успешно отправлено</NotificationBubble>
        </div>
      )}
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
