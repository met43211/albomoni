import { SingleSelector } from '@albomoni/shared/ui/single-selector';
import { useState } from 'react';
import { MultipleSelector } from '@albomoni/shared/ui/multiple-selector';
import { AttributesVariables } from '../model/category.type';

type Props = {
  attribute_id: number;
  variants: AttributesVariables;
};

export const Attribute = ({ attribute_id, variants }: Props) => {
  const initialState =
    variants.selection === 'one'
      ? variants.variants[0]
      : [variants.variants[0]];

  const [selected, setSelected] = useState(initialState);

  const selectors = {
    one: (
      <SingleSelector
        selected={selected as string}
        setSelected={setSelected}
        attribute_id={attribute_id}
        variants={variants.variants}
      />
    ),
    many: (
      <MultipleSelector
        selected={selected as string[]}
        setSelected={setSelected}
        attribute_id={attribute_id}
        variants={variants.variants}
      />
    ),
  };

  return selectors[variants.selection];
};
