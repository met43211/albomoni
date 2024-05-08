export type UserType = {
  user_id: number;
  first_name: string;
  last_name: string | null;
  patronymic: string | null;
  email: string;
  avatar: string | null;
  money: number;
  currency: string;
  subscription: boolean;
  phone: string | null;
  notifications: number;
  products: number;
  plans: number;
  views: number[];
};

export type PublicUserType = {
  user_id: number;
  first_name: string;
  last_name: string | null;
  patronymic: string | null;
  avatar: string | null;
  subscription: boolean;
  regDate: string;
  rate: number;
  feedback: number;
};
