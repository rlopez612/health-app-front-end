import React from 'react';
import style from './Form.module.css';
import Button from '../button/Button';

const Form = props => {
  const { children, title, onSubmit } = props;

  return <form className={style.Form} onSubmit={onSubmit}>
    <h1 className={style.Title}>{title}</h1>
    {children}
    <Button color="Primary" type="Submit">Login</Button>
  </form>;
}

export default Form;