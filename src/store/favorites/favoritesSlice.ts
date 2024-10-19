import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Favorite {
  id: string;
  name: string;
}

interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Favorite>) => {
      const existingIndex = state.favorites.findIndex(
        fav => fav.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
