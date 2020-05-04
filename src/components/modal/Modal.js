import React from 'react';
import style from './Modal.module.css';
import Button from '../button/Button';

const Modal = (props) => {
  const { message, reset } = props;

  return (
    <div className={style.Modal}>
      <div className={style.Container}>
        {message}
        <Button color="Primary" onClick={reset}>OK</Button>
      </div>
    </div>
  );
};

export default Modal;
