'use client';

import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';

type Props = {
  status: 'error' | 'correct';
};

export const MyAdErrorBubble = ({ status }: Props) => {
  return (
    status === 'error' && (
      <NotificationBubble type='error'>
        Объявление не прошло модерацию. Проверьте все поля на наличие
        запрещенного содержания.
      </NotificationBubble>
    )
  );
};
