import React from 'react';
import style from './Card.module.css';

const Card = (props) => {
  const { children } = props;
  return (
    <div className={style.Card}>
      {children}
    </div>
  );
};

export default Card;
