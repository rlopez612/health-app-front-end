/* eslint-disable react/button-has-type */
import React from 'react';
import style from './Button.module.css';

/**
 * @name Button
 * @description Styling wrapper around html button
 * @param {*} props children, color, type, onClick
 * @return Component
 */
const Button = ({
  children, color, type, onClick
}) => (
  <button
    className={[style.Button, style[color]].join(' ')}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
