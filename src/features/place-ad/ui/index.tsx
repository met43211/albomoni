/* eslint-disable no-param-reassign */

'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { Fragment, useEffect, useState } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { useImmer } from 'use-immer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCookie } from 'react-use';
import { InitialChosenMemoryState } from '../config/initial-chosen-memory-state';
import { GetPlaceCategoriesQueries, PlaceFormQueries } from '../api';
import { PlaceAdSkeleton } from './skeleton';

export const PlaceAd = () => {
  const { t } = useClientTranslation('filter_names');
  const [token] = useCookie('token');

  const { data, isPending, isLoading, isFetching } = useQuery(
    GetPlaceCategoriesQueries(token as string),
  );

  const { mutateAsync } = useMutation(PlaceFormQueries);

  const [chosenMemoryState, updateChosenMemoryState] = useImmer(
    InitialChosenMemoryState,
  );

  const [variants, setVariants] = useState<any>({});
  const [selectedVariants, updateSelectedVariants] = useImmer<any>([]);

  useEffect(() => {
    setVariants(data);
  }, [data]);

  if (isLoading || isFetching || isPending) return <PlaceAdSkeleton />;

  const selectFormAsync = async () => {
    const resp = await mutateAsync({ filters: selectedVariants });
    console.log(resp);
  };

  const handleClick = async (event: any) => {
    const selectedVariant = event.target.id;
    const dependencies = variants[selectedVariant];

    updateSelectedVariants((draft: any) => {
      draft.push(selectedVariant);
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevVariants.push(variants);
      draft.prevSelected.push(selectedVariant);
    });

    if (dependencies === null) {
      selectFormAsync();
    } else {
      setVariants(dependencies);
    }
  };

  const handleClickBack = () => {
    const { prevVariants } = chosenMemoryState;

    setVariants(prevVariants[prevVariants.length - 1]);

    updateSelectedVariants((draft: any) => {
      draft.length -= 1;
    });

    updateChosenMemoryState((draft: typeof InitialChosenMemoryState) => {
      draft.prevVariants.length -= 1;
      draft.prevSelected.length -= 1;
    });
  };

  return (
    <>
      {chosenMemoryState.prevSelected.length > 0 && (
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
                    <p>{t(`${title}`)}</p>
                    <p>{'>'}</p>
                  </Fragment>
                );
              }
              return <p key={title}>{t(`${title}`)}</p>;
            })}
          </div>
        </div>
      )}

      {variants && (
        <div className='flex md:grid md:grid-cols-2 gap-3 md:gap-6 flex-wrap pb-20'>
          {Object.keys(variants).map((variant) => {
            return (
              <Button
                key={variant}
                disableRipple
                size='lg'
                className='w-full rounded-2xl py-8 justify-between hover:scale-[1.02]'
                id={variant}
                onPress={handleClick}
              >
                {t(`${variant}`)}
                <PiCaretRightBold size={18} className='flex-shrink-0' />
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
