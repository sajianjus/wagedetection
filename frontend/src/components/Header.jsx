// import React, {useContext} from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { LoginContext } from '../App';
// import jwtDecode from 'jwt-decode';



// function Header() {
//     const [loggedIn, setLoggedIn] = useContext(LoginContext);
//   return (
//     <header>
//         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
//             <Container>
//                 <LinkContainer to="/">
//                     <Navbar.Brand>Nebula</Navbar.Brand>
//                 </LinkContainer>
                

//                     {loggedIn ? 
//                     (
//                         <Nav className='mr-auto'>
//                         <LinkContainer to="/profile">
//                             <Nav.Link><i className="fas fa-user"></i> {jwtDecode(localStorage.getItem('access')).name ? jwtDecode(localStorage.getItem('access')).name: null}</Nav.Link>
//                         </LinkContainer>
//                         <LinkContainer to="/logout">
//                             <Nav.Link><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
//                         </LinkContainer>
//                         </Nav>
//                     )
//                     :
//                     (
//                         <Nav className='mr-auto'>
//                         <LinkContainer to='/login'>
//                             <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
//                          </LinkContainer>
//                          </Nav>
//                     )}

                
//             </Container>
//         </Navbar>
//     </header>
//   )
// }

// export default Header;