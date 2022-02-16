/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import style from './Reservations.module.css';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';
import Reservations from '../reservations/Reservations';
/**
* @name createReservationDisplays
* @description creates card displays for each reservation object
* @return component[]
*/
const PatientDetails = () => {
  const history = useHistory();
  const params = useParams();

  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [patientInfo, setPatientInfo] = useState({
    id: '',
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal: ''
    },
    age: '',
    height: '',
    weight: '',
    insurance: '',
    gender: ''
  });

  const [inputErrors, setInputErrors] = useState({
    firstName: false,
    lastName: false,
    ssn: false,
    email: false,
    address: {
      street: false,
      city: false,
      state: false,
      postal: false
    },
    age: false,
    height: false,
    weight: false,
    insurance: false,
    gender: false
  });

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      HttpHelper(`/patients/${params.id}`, 'GET')
        .then((response) => {
          if (response.ok) {
            // if response is of 2xx
            return response.json();
          }
          // redirect to trigger NotFound page is server returns 404
          if (response.status === 404) {
            setLoading(false);
            history.push(`/room-types/${params.id}`);
            throw new Error('AbortError');
          }
          // if response is not a 2xx or 404, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then((data) => {
          setLoading(false);
          setPatientInfo(data);
          console.log(data);
        })
        .catch((error) => {
          if (error.message === 'AbortError') return;
          // set errors if not a cancel request
          setLoading(false);
          setApiError(true);
        });
    }
  }, [params.id, history]);

  const handleDelete = (id) => {
    setLoading(true);
    HttpHelper(`/patients/${id}`, 'DELETE')
      .then((response) => {
        // if delete was not successful 204, throw error to move into catch block
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        // find item to delete in reservations list
        // eslint-disable-next-line no-shadow
        const deletedIndex = patientInfo.findIndex((patientInfo) => patientInfo.id === id);
        const newPatients = [...patientInfo];
        // create copy of reservations array and remove the deleted one
        newPatients.splice(deletedIndex, 1);
        setLoading(false);
        setPatientInfo(newPatients);
      })
      .catch(() => {
        setLoading(false);
        setApiError(true);
      });
    history.push('/patients');
  };
  return (
    <Card key={patientInfo.id}>
      <h1>Patient Details</h1>
      <p className={style.Text}>
        <strong>ID: </strong>
        {patientInfo.id}
      </p>
      <p className={style.Text}>
        <strong>Patient: </strong>
        {`${patientInfo.firstName} ${patientInfo.lastName}`}
      </p>
      <p className={style.Text}>
        <strong>SSN: </strong>
        {patientInfo.ssn}
      </p>
      <p className={style.Text}>
        <strong>E-mail: </strong>
        {patientInfo.email}
      </p>
      <p className={style.Text}>
        <strong>Street: </strong>
        {patientInfo.address.street}
      </p>
      <p className={style.Text}>
        <strong>City: </strong>
        {patientInfo.address.city}
      </p>
      <p className={style.Text}>
        <strong>State: </strong>
        {patientInfo.address.state}
      </p>
      <p className={style.Text}>
        <strong>ZipCode: </strong>
        {patientInfo.address.postal}
      </p>
      <p className={style.Text}>
        <strong>Age: </strong>
        {patientInfo.age}
      </p>
      <p className={style.Text}>
        <strong>Height (inches): </strong>
        {patientInfo.height}
      </p>
      <p className={style.Text}>
        <strong>Weight: </strong>
        {patientInfo.weight}
      </p>
      <p className={style.Text}>
        <strong>Insurance: </strong>
        {patientInfo.insurance}
      </p>
      <p className={style.Text}>
        <strong>Gender: </strong>
        {patientInfo.gender}
      </p>
      <div className={style.Container}>
        <Link className={style.Link} to={`/patients/edit/${patientInfo.id}`}><Button color="Primary" type="button">Edit</Button></Link>
        <Button color="Warn" type="button" onClick={() => handleDelete(patientInfo.id)}>Delete</Button>
      </div>
    </Card>
  );
};
export default PatientDetails;
