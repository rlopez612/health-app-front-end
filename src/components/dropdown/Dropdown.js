import React from 'react';
import style from './Dropdown.module.css';

const Dropdown = (props) => {
  const {
    error, label, message, options, value, onChange
  } = props;

  return (
    <div className={style.Container}>
      <label className={style.Label}>{label}</label>
      <select className={error ? style.Error : style.Dropdown} value={value} onChange={onChange}>
        <option value="" disabled hidden>Select</option>
        {options.map((option) => <option key={option.id} value={option.roomType}>{option.roomType}</option>)}
      </select>
      {error && <label className={style.ErrMsg}>{message}</label>}
    </div>
  );
};

export default Dropdown;
