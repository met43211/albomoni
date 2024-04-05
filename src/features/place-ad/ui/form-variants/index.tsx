import { PlaceAdAddress } from './address';
import { PlaceAdAPhotos } from './photos';
import { PlaceAdPrice } from './price';
import { PlaceAdSingleSelect } from './single-select';
import { PlaceAdTextarea } from './textarea';

export type PlaceAdInput = {
  name: string;
  type: 'textarea';
  variants: string[];
  value: string | string[];
  updateForm: (draft: any) => void;
};

export const PlaceAdFormElement = ({
  name,
  type,
  variants,
  value,
  updateForm,
}: PlaceAdInput) => {
  const FormElements = {
    address: PlaceAdAddress,
    textarea: PlaceAdTextarea,
    single: PlaceAdSingleSelect,
    price: PlaceAdPrice,
    images: PlaceAdAPhotos,
  };

  const Element = FormElements[type];

  if (type in FormElements)
    return (
      <Element
        title={name}
        variants={variants}
        updateForm={updateForm}
        value={value}
      />
    );

  return null;
};
