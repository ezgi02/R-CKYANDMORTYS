import { configureStore, createSlice } from '@reduxjs/toolkit';

// Local storage işlemleri için yardımcı fonksiyonlar
export const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedFavorites = localStorage.getItem('favoriteCharacters');
    if (serializedFavorites === null) {
      return undefined;
    }
    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error('Error loading favorites from localStorage:', err);
    return undefined;
  }
};

export const saveFavoritesToLocalStorage = favorites => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem('favoriteCharacters', serializedFavorites);
  } catch (err) {
    console.error('Error saving favorites to localStorage:', err);
  }
};

// Favori karakterlerinizi tutacak slice'ı oluşturun
const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState: loadFavoritesFromLocalStorage() || [],
  reducers: {
    addFavorite: (state, action) => {
      // Eğer favori karakter zaten listede varsa ekleme
      if (!state.some(character => character.id === action.payload.id)) {
        if (state.length >= 10) {
          alert('Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
          return;
        }
        state.push(action.payload);
        saveFavoritesToLocalStorage(state); // Favori karakterleri local storage'a kaydet
      }
    },
    removeFavorite: (state, action) => {
      // Favori karakteri listeden kaldır
      const filteredFavorites = state.filter(character => character.id !== action.payload.id);
      saveFavoritesToLocalStorage(filteredFavorites); // Favori karakterleri local storage'dan kaldır
      return filteredFavorites;
    },
  },
});

// Store'u oluşturun
export const store = configureStore({
  reducer: {
    favoriteCharacters: favoriteCharactersSlice.reducer,
  },
});

// Action oluşturucuları
export const { addFavorite, removeFavorite } = favoriteCharactersSlice.actions;
