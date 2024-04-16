import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const [localFavorites, setLocalFavorites] = useLocalStorage<number[]>(
    'favorites',
    [],
  );
  const [cookies, setCookies] = useCookies();

  const storeFavorites: number[] = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const setFavorites = (array: number[]) => {
    dispatch({
      type: 'favorites/setFavorites',
      payload: array,
    });
    setLocalFavorites(array);
    setCookies('favorites', array);
  };

  const favorites = storeFavorites;

  return {
    favorites,
    localFavorites,
    setFavorites,
  };
};
