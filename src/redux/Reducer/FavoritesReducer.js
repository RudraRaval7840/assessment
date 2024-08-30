
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../Type";


const initialState = {
  favoriteBooks: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteBooks: [...state.favoriteBooks, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteBooks: state.favoriteBooks.filter(book => book.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
