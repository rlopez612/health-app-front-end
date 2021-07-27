import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './NavBar.module.css';

/**
 * @name NavBar
 * @description selectively show links for pages
 * @param {*} props user
 * @return component
 */
const NavBar = ({ user }) => {
  const [open, setOpen] = useState(false);
  let links = null;

  // add nav links if there is a valid user
  if (user) {
    links = (
      <>
        <div
          className={open ? `${style.toggleButton} ${style.close}` : style.toggleButton}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          role="menu"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && setOpen((prevOpen) => !prevOpen)}
        >
          <span className={`${style.bar} ${style.top}`} />
          <span className={`${style.bar} ${style.middle}`} />
          <span className={`${style.bar} ${style.bottom}`} />
        </div>
        <div className={open ? `${style.linkContainer} ${style.close}` : style.linkContainer}>
          <NavLink to="/reservations" className={style.Link} activeClassName={style.Active}>
            Reservations
          </NavLink>

          {user.role === 'manager' && (
            <NavLink to="/room-types" className={style.Link} activeClassName={style.Active}>
              Room Types
            </NavLink>
          )}

          <Link to="/logout" className={style.Link} onClick={() => setOpen(false)}>Logout</Link>
        </div>
      </>
    );
  }

  return (
    <nav className={style.NavBar}>
      <h3 className={style.Logo}>Hotel Bookings</h3>
      {links}
    </nav>
  );
};

export default NavBar;
