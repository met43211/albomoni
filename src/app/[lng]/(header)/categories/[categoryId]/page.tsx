import { CategoryPage } from '@albomoni/page/category';

type Props = {
  params: {
    lng: string;
    categoryId: string;
  };
};

export default async function Category({ params: { lng, categoryId } }: Props) {
  return <CategoryPage lng={lng} categoryId={categoryId} />;
}
