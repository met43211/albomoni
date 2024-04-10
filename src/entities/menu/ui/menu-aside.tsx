import { Button } from '@nextui-org/button';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Dropdown,
} from '@nextui-org/dropdown';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  PiCaretDownBold,
  PiCaretRightBold,
  PiCurrencyRubBold,
  PiTranslateBold,
} from 'react-icons/pi';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { ThemeIcons } from '../config/theme-icons';

export const MenuAside = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useClientTranslation();

  const Icon = ThemeIcons[theme as 'light' | 'dark' | 'system'];

  return (
    <aside className='w-full md:w-80 flex-shrink-0 flex flex-col gap-4'>
      <Link href='/login'>
        <button
          type='button'
          className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold hover:scale-105 active:scale-95 transition-transform'
        >
          Вход и регистрация
        </button>
      </Link>
      <div className='flex gap-4'>
        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full h-28 bg-[--bg] dark:bg-[--element] shadow-base rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative overflow-clip'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Язык</p>
                <p className='font-semibold text-md opacity-60'>Русский</p>
              </div>

              <PiCaretDownBold size={20} />

              <PiTranslateBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['ru'])}
          >
            <DropdownItem key='ru'>Русский</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full bg-[--bg] dark:bg-[--element] shadow-base h-28 rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Валюта</p>
                <p className='font-semibold text-md opacity-60'>RUB</p>
              </div>

              <PiCaretDownBold size={20} />

              <PiCurrencyRubBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['rub'])}
          >
            <DropdownItem key='rub'>RUB</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Dropdown
        backdrop='blur'
        placement='bottom'
        classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
      >
        <DropdownTrigger>
          <Button
            size='lg'
            className='h-14 bg-[--bg] dark:bg-[--element] rounded-2xl shadow-base justify-between'
          >
            <div className='flex gap-4'>
              <Icon size={20} />
              <p className='font-semibold text-sm'>Оформление</p>
            </div>

            <PiCaretRightBold size={18} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={new Set([theme as 'light' | 'dark' | 'system'])}
        >
          <DropdownItem onPress={() => setTheme('light')} key='light'>
            {t('theme.light')}
          </DropdownItem>
          <DropdownItem onPress={() => setTheme('dark')} key='dark'>
            {t('theme.dark')}
          </DropdownItem>
          <DropdownItem onPress={() => setTheme('system')} key='system'>
            {t('theme.system')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </aside>
  );
};
