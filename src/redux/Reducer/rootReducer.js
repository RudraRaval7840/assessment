
import { combineReducers } from 'redux';
import favoriteReducer from './FavoritesReducer';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

export default rootReducer;
