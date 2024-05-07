export type ImageType = { full: string; preview: string };

type AdInfo = {
  id: number;
  description: string;
  title: string | null;
  cost: number;
  currency: string;
  date: string;
  hash: string;
  geoposition: string;
  isService: boolean;
  category: string[];
  images: ImageType[];
  status: 'active' | 'moderating' | 'archived';
  views: number;
  favorites: number;
  seller: 'owner' | 'broker';
  additional: {
    [key: string]: string;
  };
};

export type Ad = {
  ad: AdInfo;
  seller: {
    user_id: number;
    name: string;
    avatar: string | null;
    subscription: boolean;
    rating: number;
    feedback_count: number;
  };
};

export type MyAd = AdInfo & {
  views: number;
  favorites: number;
};
