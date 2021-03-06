import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../other/Burger';
import Logo from './Logo';
import Navbar from './NavBar';
import Search from './Search';
import Sign from '../../containers/Sign';
import LogOut from './LogOut';
import roles from '../../constants/roles';

export default function Header({
  categories = [],
  currentUser = roles.NON_AUTHORIZED,
  logOut
}) {
  return (
    <header className='header header_fixed'>
      <Burger />
      <Logo />
      <Navbar categories={categories} />
      <Search />
      {currentUser.role === roles.NON_AUTHORIZED ? (
        <Sign />
      ) : (
        <LogOut
          role={currentUser.role}
          onLogOut={logOut}
        />
      )}
    </header>
  );
}

Header.propTypes = {
  categories: PropTypes.array,
  currentUser: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  logOut: PropTypes.func.isRequired
};
