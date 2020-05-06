import React from 'react';
import style from './Modal.module.css';
import Button from '../button/Button';

/**
 * @name Modal
 * @description styling component to display error messages in modal
 * @param {*} props message, reset
 * @return component
 */
const Modal = ({ message, reset }) => (
  <div className={style.Modal}>
    <div className={style.Container}>
      {message}
      <Button color="Primary" type="button" onClick={reset}>OK</Button>
    </div>
  </div>
);

export default Modal;
