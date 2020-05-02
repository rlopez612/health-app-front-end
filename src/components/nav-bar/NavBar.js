import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = props => {
  const { loggedIn, role } = props;

  let links = null;

  if (loggedIn) {
    links = <>
      <NavLink to="/reservations" activeClassName="active">
        Reservations
      </NavLink>

      {role === 'manager' && <NavLink to="/rooms" activeClassName="active">
        Rooms
      </NavLink>}

      <Link to="/logout">Logout</Link>
    </>;
  }

  return <nav>
    <h3>Hotel Bookings</h3>
    {links}
  </nav>
}

export default NavBar;