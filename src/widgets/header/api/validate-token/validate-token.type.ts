import { User } from '@albomoni/shared/model/types/user.type';

export type ValidateTokenInputData = {
  token: string;
};

export type ValidateTokenOutputData = User;
