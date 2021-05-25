import React from 'react';
import style from './Checkbox.module.css';

/**
 * @name Checkbox
 * @description Styling wrapper around checkbox type html input
 * @param {*} props checked label onChange
 * @return component
 */
const Checkbox = ({ checked, label, onChange }) => (
  <div className={style.width}>
    <div className={style.Container}>
      <label className={style.Label} htmlFor={label}>{label}</label>

      <input
        type="checkbox"
        className={style.Checkbox}
        checked={checked}
        id={label}
        onChange={onChange}
      />
    </div>
  </div>
);

export default Checkbox;
