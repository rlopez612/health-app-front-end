/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import style from './Dropdown.module.css';

/**
 * @name DropDown
 * @description styling wrapper around html select element
 * @param {*} props error, label, message, options, value, onChange
 * @return component
 */

const Dropdown = ({
  error,
  label,
  message,
  options,
  value,
  onChange
}) => (
  <div className={style.Container}>
    <label className={style.Label} htmlFor={label}>{label}</label>

    <select
      className={error ? style.Error : style.Dropdown}
      value={value}
      id={label}
      onChange={onChange}
    >
      <option value="" disabled hidden>Select</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>

    <p className={style.ErrMsg}>{error && message}</p>
  </div>
);

export default Dropdown;
