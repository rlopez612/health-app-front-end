import React from 'react';
import style from './Form.module.css';
import Button from '../button/Button';

/**
 * @name Form
 * @description styling wrapper around html form element with submit button
 * @param {*} props action, children, title, onsubmit
 * @return component
 */
const Form = ({
  action, children, title, onSubmit
}) => (
  <form className={style.Form} onSubmit={onSubmit} noValidate>
    <h1 className={style.Title}>{title}</h1>
    {children}
    <Button color="Primary" type="Submit">{action}</Button>
  </form>
);

export default Form;
