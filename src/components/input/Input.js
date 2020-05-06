import React from 'react';
import style from './Input.module.css';

/**
 * @name Input
 * @description styling wrapper around html input element
 * @param {*} props error, label, message, value, onChange
 * @return component
 */
const Input = ({
  error,
  label,
  message,
  value,
  onChange
}) => (
  <div className={style.Container}>
    <label className={style.Label} htmlFor={label}>{label}</label>

    <input
      className={error ? style.Error : style.Input}
      value={value}
      id={label}
      onChange={onChange}
    />

    {error && <p className={style.ErrMsg}>{message}</p>}
  </div>
);

export default Input;
