import React from 'react';
import style from './Textarea.module.css';

const Textarea = props => {
  const { error, label, message } = props;
  return <div className={style.Container}>
    <label className={style.Label}>{label}</label>
    <textarea rows="2" cols="20" className={error ? style.Error : style.Textarea} {...props} />
    {error && <label className={style.ErrMsg}>{message}</label>}
  </div>
}

export default Textarea;