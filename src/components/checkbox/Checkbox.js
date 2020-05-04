import React from 'react';
import style from './Checkbox.module.css';

const Checkbox = (props) => {
  const { label } = props;

  return (
    <div className={style.Container}>
      <label className={style.Label}>{label}</label>
      <input type="checkbox" className={style.Checkbox} {...props} />
    </div>
  );
};

export default Checkbox;
