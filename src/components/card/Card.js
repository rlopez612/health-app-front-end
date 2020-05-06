import React from 'react';
import style from './Card.module.css';

/**
 * @name Card
 * @description basic card styled div
 * @param {*} props children
 * @return component
 */
const Card = ({ children }) => (
  <div className={style.Card}>
    {children}
  </div>
);

export default Card;
