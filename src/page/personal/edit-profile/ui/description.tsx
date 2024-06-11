'use client';

import { editUserField } from '@albomoni/shared/lib/providers/modal/api/(edit-user)/edit-user-field';
import { RichTextEditor } from '@albomoni/shared/ui/(inputs)/rich-text-editor';
import DraftJsRenderer from '@albomoni/shared/ui/draft-js-render/ui';
import { Button } from '@nextui-org/react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const EditDescription = ({ description }: { description: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [desc, setDesc] = useState('');
  const handleSave = async () => {
    try {
      const token = getCookie('token');
      await editUserField({ description: desc }, token as string);
      setIsEdit(false);
      router.refresh();
    } catch (error) {
      return;
    }
  };
  return (
    <div className='w-full flex flex-col gap-2'>
      <h3 className='opacity-50 font-medium'>Описание</h3>
      {isEdit ? (
        <div className='w-full gap-4 flex flex-col'>
          <RichTextEditor value={desc} onChange={setDesc} />
          <Button onPress={handleSave} className='w-full'>
            Сохранить
          </Button>
        </div>
      ) : (
        <div className='w-full flex gap-4 flex-col'>
          {JSON.parse(description).blocks[0].text.length ? (
            <>
              <DraftJsRenderer value={desc} />
              <Button onPress={() => setIsEdit(true)}>
                Редактировать описание
              </Button>
            </>
          ) : (
            <Button onPress={() => setIsEdit(true)}>Добавить описание</Button>
          )}
        </div>
      )}
    </div>
  );
};
