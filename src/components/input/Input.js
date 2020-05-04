import React from 'react';
import style from './Input.module.css';

const Input = (props) => {
  const { error, label, message } = props;

  return (
    <div className={style.Container}>
      <label className={style.Label}>{label}</label>
      <input className={error ? style.Error : style.Input} {...props} />
      {error && <label className={style.ErrMsg}>{message}</label>}
    </div>
  );
};

export default Input;
