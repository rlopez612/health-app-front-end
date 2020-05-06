import React from 'react';
import style from './Textarea.module.css';

/**
 * @name Textarea
 * @description style wrapping around html textarea element
 * @param {*} props
 * @return component
 */
const Textarea = ({
  error,
  label,
  message,
  value
}) => (
  <div className={style.Container}>
    <label className={style.Label} htmlFor={label}>{label}</label>

    <textarea
      rows="2"
      cols="20"
      className={error ? style.Error : style.Textarea}
      value={value}
      id={label}
    />

    {error && <p className={style.ErrMsg}>{message}</p>}
  </div>
);
export default Textarea;
