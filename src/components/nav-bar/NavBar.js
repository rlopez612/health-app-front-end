import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './NavBar.module.css';

/**
 * @name NavBar
 * @description selectively show links for pages
 * @param {*} props user
 * @return component
 */
const NavBar = ({ user }) => {
  let links = null;

  // add nav links if there is a valid user
  if (user) {
    links = (
      <div className={style.Links}>
        <NavLink to="/reservations" className={style.Link} activeClassName={style.Active}>
          Reservations
        </NavLink>

        {user.role === 'manager' && (
          <NavLink to="/room-types" className={style.Link} activeClassName={style.Active}>
            Room Types
          </NavLink>
        )}

        <Link to="/logout" className={style.Link}>Logout</Link>
      </div>
    );
  }

  return (
    <nav className={style.NavBar}>
      <h3>Hotel Bookings</h3>
      {links}
    </nav>
  );
};

export default NavBar;
