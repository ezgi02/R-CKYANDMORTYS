// Navbar.js

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Navbar color="light" light expand="md" style={{ marginBottom: '20px' }}>
      <NavbarBrand href="/">Home</NavbarBrand>
      <Nav className="ml-auto" navbar>
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
  );
}

export default CustomNavbar;
