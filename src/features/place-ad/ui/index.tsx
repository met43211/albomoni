/* eslint-disable no-param-reassign */

'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import jsonFilters from '@albomoni/shared/model/filters.json';
import { Button } from '@nextui-org/button';
import { Fragment, useState } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { useImmer } from 'use-immer';
import { InitialChosenMemoryState } from '../config/initial-chosen-memory-state';

export const PlaceAd = () => {
  const { t } = useClientTranslation('filter_names');

  const { filters } = JSON.parse(JSON.stringify(jsonFilters));
  const [filterTitle, setFilterTitle] = useState('categories');
  const [chosenMemoryState, updateChosenMemoryState] = useImmer(
    InitialChosenMemoryState,
  );
  
  const [variants, setVariants] = useState(filters);
  const [selectedVariants, updateSelectedVariants] = useImmer<any>({});

  const handleClick = (event: any) => {
    const selectedVariant = event.target.id;
    const dependencies = variants[selectedVariant];

    updateSelectedVariants((draft: any) => {
      draft[filterTitle] = selectedVariant;
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevVariants.push(variants);
      draft.prevTitles.push(filterTitle);
      draft.prevSelected.push(selectedVariant);
    });

    if ('static' in dependencies) {
      console.log(selectedVariants);
    } else {
      setFilterTitle(dependencies.name);
      setVariants(dependencies.variants);
    }
  };

  const handleClickBack = () => {
    const { prevTitles, prevVariants } = chosenMemoryState;

    const currPrevTitle = prevTitles[prevTitles.length - 1];

    setFilterTitle(currPrevTitle);
    setVariants(prevVariants[prevVariants.length - 1]);

    updateSelectedVariants((draft: any) => {
      delete draft[currPrevTitle];
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevTitles.length -= 1;
      draft.prevVariants.length -= 1;
      draft.prevSelected.length -= 1;
    });
  };

  return (
    <>
      {chosenMemoryState.prevTitles.length > 0 && (
        <div className='w-full flex items-start gap-6'>
          <Button
            radius='full'
            isIconOnly
            className='w-min'
            onPress={handleClickBack}
          >
            <PiCaretLeftBold size={20} />
          </Button>
          <div className='w-full flex flex-wrap opacity-50 items-center gap-2 pt-2'>
            {chosenMemoryState.prevSelected.map((title, index, array) => {
              if (index < array.length - 1) {
                return (
                  <Fragment key={title}>
                    <p>
                      {t(`${chosenMemoryState.prevTitles[index]}.${title}`)}
                    </p>
                    <p>{'>'}</p>
                  </Fragment>
                );
              }
              return (
                <p key={title}>
                  {t(`${chosenMemoryState.prevTitles[index]}.${title}`)}
                </p>
              );
            })}
          </div>
        </div>
      )}
      <div className='flex gap-3 sm:gap-6 flex-wrap pb-20'>
        {Object.keys(variants).map((variant) => {
          return (
            <Button
              key={variant}
              disableRipple
              size='lg'
              className='w-full sm:w-min min-w-72 rounded-2xl py-8 justify-between'
              id={variant}
              onPress={handleClick}
            >
              {t(`${filterTitle}.${variant}`)}
              <PiCaretRightBold size={18} className='flex-shrink-0' />
            </Button>
          );
        })}
      </div>
    </>
  );
};
