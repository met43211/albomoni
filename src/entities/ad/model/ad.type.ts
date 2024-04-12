export type Ad = {
  ad: {
    id: number;
    description: string;
    title: string;
    cost: number;
    date: string;
    geoposition: string;
    isService: boolean;
    category: string;
    images: { full: string; preview: string }[];
  };
  seller: {
    user_id: number;
    name: string;
    avatar: string;
    rating: number;
    feedback_count: number;
  };
};
