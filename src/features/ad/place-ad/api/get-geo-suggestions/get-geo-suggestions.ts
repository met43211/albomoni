import { GEOSUGGEST_URL } from '@albomoni/shared/config';

export const getGeoSuggestions = (query: string) =>
  fetch(GEOSUGGEST_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_DADATA_API_URL}`,
      'X-Secret': process.env.NEXT_PUBLIC_DADATA_SECRET_KEY || '',
    },
    body: JSON.stringify([query]),
  });

export const makeRequest = (query: string) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', GEOSUGGEST_URL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader(
    'Authorization',
    `Token ${process.env.NEXT_PUBLIC_DADATA_API_URL}`,
  );
  xhr.setRequestHeader(
    'X-Secret',
    process.env.NEXT_PUBLIC_DADATA_SECRET_KEY || '',
  );
  xhr.send(JSON.stringify([query]));
  xhr.onload = () => {
    return JSON.parse(xhr.response);
  };
};
