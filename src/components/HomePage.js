import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Input, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import CustomNavbar from './CustomNavbar';
const HomePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  }, []);

  // Calculate current episodes
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const filteredEpisodes = episodes.filter(episode =>
    episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentEpisodes = filteredEpisodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
      <h2>Episodes:Ricky And Morty</h2>
      <Navbar color="light" light expand="md" style={{ marginBottom: '20px' }}>
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="ml-auto" navba  r>
          <NavItem>
            <Link className="nav-link" to="/favorites">FavoriteListe</Link>
          </NavItem>
        </Nav>
        <Input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '300px', marginLeft: '20px' }}
        />
      </Navbar>
      <Row xs="1" md="3">
        {currentEpisodes.length > 0 ? (
          currentEpisodes.map(episode => (
            <Col key={episode.id} style={{ marginBottom: '20px' }}>
              <Card>
                <CardImg top width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7fjVpOpqjRAJJIwFxcYtuX_yZPlltvH7UWZ-dddzMNnVoZv_84RWuzk8hofKxlyFnjtM&usqp=CAU" alt={episode.name} />
                <CardBody>
                  <CardTitle tag="h5">{episode.name}</CardTitle>
                  <Link to={`/episode/${episode.id}`}>Details</Link>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No episodes found.</p>
          </Col>
        )}
      </Row>
      <Pagination>
        <PaginationItem>
          <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
        </PaginationItem>
        {[...Array(Math.ceil(filteredEpisodes.length / episodesPerPage))].map((_, index) => (
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
    </Container>
  );
}

export default HomePage;
