import { CategoryPage } from '@albomoni/page/category';

type Props = {
  params: {
    lng: string;
    categoryId: string;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Category({
  params: { lng, categoryId },
  searchParams,
}: Props) {
  return (
    <CategoryPage
      lng={lng}
      categoryId={categoryId}
      searchParams={searchParams}
    />
  );
}
