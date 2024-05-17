import { useState } from 'react';
import { useModal } from '../lib/use-modal';
import { EModalStates } from '../model/modal-states.enum';
import { ModalVariantSubscription } from './variants/subscription';
import { ModalVariantStopAd } from './variants/stop-ad';
import { ModalVariantStartAd } from './variants/start-ad';
import { ModalVariantPromoteAd } from './variants/promote-ad';

export const ModalContent = () => {
  const { modalState } = useModal();

  const renderContent = () => {
    switch (modalState) {
    case EModalStates.SUBSCRIPTION:
      return <ModalVariantSubscription />;
    case EModalStates.STOP_AD:
      return <ModalVariantStopAd />;
    case EModalStates.START_AD:
      return <ModalVariantStartAd />;
    case EModalStates.PROMOTE_AD:
      return <ModalVariantPromoteAd />;
    default:
      return null;
    }
  };

  const [content] = useState(renderContent());

  return content;
};
