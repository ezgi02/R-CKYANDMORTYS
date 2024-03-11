import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EpisodePage from './components/EpisodePage';
import CharacterPage from './components/CharacterPage';
import FavoriteCharactersPage from './components/FavoriteCharactersPage';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/episode/:id" element={<EpisodePage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/favorites" element={<FavoriteCharactersPage />} />
        </Routes>
      </div>
    
  );
}

export default App;
