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
  