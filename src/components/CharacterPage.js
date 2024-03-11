import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite } from '../store'; // Redux action creator'ı ekleyin
import { Button } from 'reactstrap';

const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector(state => state.favoriteCharacters); // Redux store'dan favori karakterleri al

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        setCharacter(response.data);
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
      });
  }, [id]);

  // const handleAddToFavorites = () => {
  //   dispatch(addFavorite(character)); // Favoriye ekleme işlemi Redux action creator'ı ile gerçekleştiriliyor
  // };
  const handleAddToFavorites = () => {
    // Favori karakterler listesinde aynı kimlikte karakter olup olmadığını kontrol et
    const isAlreadyFavorite = favoriteCharacters.some(favorite => favorite.id === character.id);
    if (isAlreadyFavorite) {
      alert('Bu karakter zaten favori listesinde!');
    } else {
      if (favoriteCharacters.length >= 10) {
        alert('Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
      } else {
        dispatch(addFavorite(character)); // Favoriye ekleme işlemi Redux action creator'ı ile gerçekleştiriliyor
        alert('Karakter favorilere eklendi!');
      }
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          {/* <Link className="navbar-brand" to="/episode">Episodes</Link> */}
        </div>
      </nav>
      {character ? (
        <div className="container mt-5 text-center">
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          <img src={character.image} alt={character.name} className="img-fluid" />
          <div className="mt-3">
            <Button color="primary" onClick={handleAddToFavorites}>Add to Favorites</Button>
            {/* <Link to="/episode" className="btn btn-secondary ml-3">Go to Episode Page</Link> */}
          </div>
        </div>
      ) : (
        <p className="mt-5 text-center">Loading...</p>
      )}
    </div>
  );
}

export default CharacterPage;
