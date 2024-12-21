import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
   <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Nav className='me-auto'>
                <NavLink to='/' className='nav-link'>Home</NavLink>
                <NavLink to='/posts/add' className='nav-link'>Add new post</NavLink>
            </Nav>
        </Container>
    </Navbar>
   </>
  );
}

export default Header;