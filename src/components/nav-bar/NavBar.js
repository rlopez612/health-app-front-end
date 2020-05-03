import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = props => {
  const { user } = props;

  let links = null;

  if (user) {
    links = <div className={style.Links}>
      <NavLink to="/reservations" className={style.Link} activeClassName={style.Active}>
        Reservations
      </NavLink>

      {user.role === 'manager' && <NavLink to="/rooms" className={style.Link} activeClassName={style.Active}>
        Rooms
      </NavLink>}

      <Link to="/logout" className={style.Link}>Logout</Link>
    </div>;
  }

  return <nav className={style.NavBar}>
    <h3>Hotel Bookings</h3>
    {links}
  </nav>
}

export default NavBar;