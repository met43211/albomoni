export type PlaceAdInputData = {
  filters?: string[];
  fields?: {
    [key: string]: string | string[] | FormData | File[];
  };
  images?: FormData;
  hash: string;
  token: string | null;
};

export type PlaceAdOutputData = {
  [key: string]: object | string;
};
