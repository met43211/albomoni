import { Modal, ModalContent } from '@nextui-org/modal';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { ModalHeader } from './modal-header';
import { MenuVariants } from '../config/menu-variants';
import { MenuAside } from './menu-aside';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const Menu = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      backdrop='transparent'
      motionProps={MenuVariants}
      size='full'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: 'hidden', base: 'dark:bg-black' }}
    >
      <ModalContent>
        {(onClose) => (
          <div className='flex flex-col w-full items-center'>
            <ModalHeader onClose={onClose} />
            <ScrollShadow className='flex w-full h-[calc(100dvh-80px)] flex-col md:flex-row-reverse gap-4 px-4 max-w-7xl pt-4'>
              <MenuAside />
              <div className='w-full'>
                <div className='w-1 h-[1000px]' />
              </div>
            </ScrollShadow>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
