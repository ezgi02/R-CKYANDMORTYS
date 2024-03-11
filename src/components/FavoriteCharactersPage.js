import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { removeFavorite } from '../store';
import {  Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const FavoriteCharactersPage = () => {
  const favoriteCharacters = useSelector(state => state.favoriteCharacters);
  const dispatch = useDispatch();

  const handleRemoveFavorite = character => {
    const isConfirmed = window.confirm(`Are you sure you want to remove ${character.name} from favorites?`);
    if (isConfirmed) {
      dispatch(removeFavorite(character));
    }
  };

  return (
    <Container>
      <Navbar color="light" light expand="md" style={{ marginBottom: '20px' }}>
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="ml-auto" navba  r>
          <NavItem>
            <Link className="nav-link" to="/favorites">FavoriteListe</Link>
          </NavItem>
        </Nav>
        </Navbar>
      <h2>Favorite Characters</h2>
      <Row xs="1" md="3">
        {favoriteCharacters.map(character => (
          <Col key={character.id} style={{ marginBottom: '20px' }}>
            <div>
              <img src={character.image} alt={character.name} />
              <h5>{character.name}</h5>
              <Button color="danger" onClick={() => handleRemoveFavorite(character)}>
                Remove from Favorites
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoriteCharactersPage;
