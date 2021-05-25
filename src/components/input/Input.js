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
  type,
  value,
  onChange
}) => (
  <div className={style.Container}>
    <label className={style.Label} htmlFor={label}>{label}</label>

    <input
      className={error ? style.Error : style.Input}
      type={type}
      value={value}
      id={label}
      onChange={onChange}
    />

    <p className={style.ErrMsg}>{error && message}</p>
  </div>
);

export default Input;
