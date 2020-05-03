import React from 'react';
import style from './Input.module.css';

const Input = props => {
  return <div className={style.Container}>
    <label className={style.Label}>{props.label}</label>
    <input className={style.Input} {...props} />
  </div>
}

export default Input;