import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from './LeafName.png'; 


function NavBar( {username, setMyRecipes, setMyCollections, setUserProfile} ) {
  const [buttonColors, setButtonColors] = useState(['#838383', '#c9c9c9'])
  
  let navigate = useNavigate();

  const navToBrowse = () => {
    navigate(`/PrepUp/${username}/browse`);
  }

  const navToLikedRecipes = () => {
      navigate(`/PrepUp/${username}/likedRecipes`);
  }

  const navToSavedCollections = () => {
      navigate(`/PrepUp/${username}/savedCollections`)
  }

  const navToUserProfile = () => {
    navigate(`/PrepUp/${username}/Profile`)
}


    return (
        <>
        
        <Navbar bg='white' expand='sm' className="mb-3" style={{ height: '150px'}}>
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            {/* <Navbar.Brand className = 'mx-auto'  href="#"  >Prep Up</Navbar.Brand> */}
            <Navbar.Brand className='mx-auto' href="#">
              <img
                src={logo}
                style={{ 'margin-left' : '50px'}}
                height="80"
                // className="d-inline-block align-top"
                alt="Logo"
                onClick={navToBrowse}
              />
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement='start'
              width='10px'
            >

              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >

              <Nav className="justify-content-end flex-grow-1 pe-3">
                  {setMyRecipes ? 
                    (
                    <Nav.Link onClick={navToLikedRecipes} style={{ 'color': buttonColors[0]}}>My Recipes</Nav.Link>
                    ) :
                    (
                    <Nav.Link onClick={navToLikedRecipes} style={{ 'color': buttonColors[1]}}>My Recipes</Nav.Link>
                    )
                  }

                  {setMyCollections ? 
                    (
                    <Nav.Link onClick={navToSavedCollections} style={{ 'color': buttonColors[0]}}>My Collections</Nav.Link>
                    ) :
                    (
                    <Nav.Link onClick={navToSavedCollections} style={{ 'color': buttonColors[1]}}>My Collections</Nav.Link>
                    )
                  }

                  {setUserProfile ? 
                      (
                      <Nav.Link onClick={navToUserProfile} style={{ 'color': buttonColors[0]}}>Profile</Nav.Link>
                      ) :
                      (
                      <Nav.Link onClick={navToUserProfile} style={{ 'color': buttonColors[1]}}>Profile</Nav.Link>
                      )
                    }
              </Nav>
                  
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}

                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default NavBar;