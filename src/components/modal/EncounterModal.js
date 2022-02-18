import React from 'react';
import { Link } from 'react-router-dom';
import style from './EncounterModal.module.css';
import Button from '../button/Button';

/**
 * @name Modal
 * @description styling component to display error messages in modal
 * @param {*} props message, reset
 * @return component
 */
const EncounterModal = ({ encounter, reset }) => (
  <div className={style.Modal}>
    <div className={style.Container}>
      <p className={style.Text}>
        <strong>ID: </strong>
        {encounter.id}
      </p>
      <p className={style.Text}>
        <strong>Date: </strong>
        {encounter.date}
      </p>
      <p className={style.Text}>
        <strong>Visit Code: </strong>
        {encounter.visitCode}
      </p>
      <p className={style.Text}>
        <strong>Provider: </strong>
        {encounter.provider}
      </p>
      <p className={style.Text}>
        <strong>Billing Code: </strong>
        {encounter.billingCode}
      </p>
      <p className={style.Text}>
        <strong>icd10: </strong>
        {encounter.icd10}
      </p>
      <p className={style.Text}>
        <strong>Total Cost:  </strong>
        {` $${encounter.totalCost}`}
      </p>
      <p className={style.Text}>
        <strong>Copay:  </strong>
        {` $${encounter.copay}`}
      </p>
      <p className={style.Text}>
        <strong>Chief Complaint:  </strong>
        {encounter.chiefComplaint}
      </p>
      <p className={style.Text}>
        <strong>Pulse: </strong>
        {encounter.pulse}
      </p>
      <p className={style.Text}>
        <strong>Blood Pressure:  </strong>
        {`${encounter.systolic}/${encounter.diastolic}`}
      </p>
      <p className={style.Text}>
        <strong>Notes: </strong>
        {encounter.notes}
      </p>
      <Button color="Primary" type="button" onClick={reset}>OK</Button>
      <Link className={style.Link} to={`/patients/edit/${encounter.id}`}><Button color="Primary" type="button">Edit</Button></Link>
    </div>
  </div>
);

export default EncounterModal;
