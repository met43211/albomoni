/* eslint-disable sonarjs/no-small-switch */

import { useState } from 'react';
import { useModal } from '../lib/use-modal';
import { EModalStates } from '../model/modal-states.enum';
import { ModalVariantSubscription } from './variants/subscription';

export const ModalContent = () => {
  const { modalState } = useModal();

  const renderContent = () => {
    switch (modalState) {
    case EModalStates.SUBSCRIPTION:
      return <ModalVariantSubscription />;
    default:
      return null;
    }
  };

  const [content] = useState(renderContent());

  return content;
};
