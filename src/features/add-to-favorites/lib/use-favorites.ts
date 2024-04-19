import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
import { setCookie } from 'cookies-next';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const [localFavorites, setLocalFavorites] = useLocalStorage<number[]>(
    'favorites',
    [],
  );

  const storeFavorites: number[] = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const setFavorites = (array: number[]) => {
    dispatch({
      type: 'favorites/setFavorites',
      payload: array,
    });
    setLocalFavorites(array);
    setCookie('favorites', array);
  };

  const favorites = storeFavorites;

  return {
    favorites,
    localFavorites,
    setFavorites,
  };
};
