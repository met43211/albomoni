export type Ad = {
  ad: {
    id: number;
    description: string;
    title: string | null;
    cost: number;
    currency: string;
    date: string;
    geoposition: string;
    isService: boolean;
    category: string[];
    images: { full: string; preview: string }[];
    additional: {
      [key: string]: string;
    };
  };
  seller: {
    user_id: number;
    name: string;
    avatar: string;
    rating: number;
    feedback_count: number;
  };
};
