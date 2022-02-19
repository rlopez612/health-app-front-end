import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';

/**
 * @name NavBar
 * @description selectively show links for pages

 * @return component
 */
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const links = (
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
        <NavLink to="/" className={style.Link} activeClassName={style.Active}>
          All Patients
        </NavLink>
      </div>
    </>
  );

  return (
    <nav className={style.NavBar}>
      <h3 className={style.Logo}>Super Health Inc.</h3>
      {links}
    </nav>
  );
};

export default NavBar;
