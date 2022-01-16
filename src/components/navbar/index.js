import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { withRouter } from 'next/router';
import axios from 'axios';
//Material
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NavBar = ({ router, handleDrawerToggle, consultorio_nombre, user }) => {
  const matches = useMediaQuery('(max-width:991px)');

  const handleLogout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        if (response.status == 200) window.location.replace('/');
      })
      .catch((error) => {});
  };

  return (
    <Navbar
      expand='lg'
      style={{ background: '#f3f8fb' }}
      sticky='top'
      className='px-5'>
      <Nav.Item>
        {matches ? (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Link href='/'>
          <a className='navbar-brand ml-2'>
            <strong>{consultorio_nombre}</strong>
          </a>
        </Link>
      </Nav.Item>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto pe-5'>
          <NavDropdown title={user.nombre} id='navbarScrollingDropdown'>
            <NavDropdown.Item href='#action3'>
              <i className='fas fa-user' /> Profile
            </NavDropdown.Item>
            <NavDropdown.Item href='#action4' onClick={handleLogout}>
              <i className='fas fa-sign-out-alt' /> Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
