import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Input, Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'; // Button bileşenini import et

import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const EpisodePage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const episodesPerPage = 9;
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector(state => state.favoriteCharacters);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(response => {
        setEpisode(response.data);
        Promise.all(response.data.characters.map(characterUrl => axios.get(characterUrl)))
          .then(charactersResponse => {
            setCharacters(charactersResponse.map(res => res.data));
          })
          .catch(error => {
            console.error('Error fetching characters:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching episode details:', error);
      });
  }, [id]);

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentCharacters = filteredCharacters.slice(indexOfFirstEpisode, indexOfLastEpisode);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAddToFavorites = character => {
    const isAlreadyFavorite = favoriteCharacters.some(favorite => favorite.id === character.id);
    if (isAlreadyFavorite) {
      alert('Bu karakter zaten favori listesinde!');
    } else {
      if (favoriteCharacters.length >= 10) {
        alert('Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
      } else {
        dispatch(addFavorite(character));
        alert('Karakter favorilere eklendi!');
      }
    }
  };

  return (
    <Container>
      <Navbar color="light" light expand="md" style={{ marginBottom: '20px' }}>
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/favorites">FavoriteListe</Link>
          </NavItem>
        </Nav>
        <Input
          type="text"
          placeholder="Search characters by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '300px', marginLeft: '20px' }}
        />
      </Navbar>
      {episode ? (
        <div>
          <h2>{episode.name}</h2>
          <p>Air date: {episode.air_date}</p>
          <p>Episode: {episode.episode}</p>
          <p>Characters:</p>
          <Row xs="1" md="3" lg="3">
            {currentCharacters.map(character => (
              <Col key={character.id} style={{ marginBottom: '20px' }}>
                <Card>
                  <CardImg top width="100%" src={character.image} alt={character.name} />
                  <CardBody>
                    <CardTitle tag="h5">{character.name}</CardTitle>
                    <Link to={`/character/${character.id}`} style={{ marginRight: '100px' }}>Character Details</Link>
                      <Button onClick={() => handleAddToFavorites(character)}>
                        <FontAwesomeIcon icon={faHeart} style={{ color: favoriteCharacters.some(favorite => favorite.id === character.id) ? 'red' : 'grey' }} />
                      </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination>
            <PaginationItem>
              <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
            </PaginationItem>
            {[...Array(Math.ceil(filteredCharacters.length / episodesPerPage))].map((_, index) => (
              <PaginationItem key={index} active={index + 1 === currentPage}>
                <PaginationLink onClick={() => paginate(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </Pagination>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default EpisodePage;
