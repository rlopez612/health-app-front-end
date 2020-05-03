import React from 'react';
import style from './Button.module.css';

const Button = props => {
  const { children, color } = props;
  return <button className={[style.Button, style[color]].join(' ')} {...props}>{children}</button>;
}

export default Button;