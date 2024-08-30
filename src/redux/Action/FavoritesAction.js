
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../Type";


export const addToFavorites = product => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFromFavorites = productId => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productId,
});
