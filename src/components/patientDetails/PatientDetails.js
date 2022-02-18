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
import EncounterModal from '../modal/EncounterModal';
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
  const [encounterModal, setEncounterModal] = useState(false);

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

  const [encounters, setEncounters] = useState({});

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      Promise.all([HttpHelper(`/patients/${params.id}`, 'GET'), HttpHelper(`/patients/${params.id}/encounters`, 'GET')])
        .then(([patientResponse, encounterResponse]) => {
          if (patientResponse.ok && encounterResponse.ok) {
            // if response is of 2xx
            return Promise.all([patientResponse.json(), encounterResponse.json()]);
          }
          // redirect to trigger NotFound page is server returns 404
          if (patientResponse.status === 404 || encounterResponse.status === 404) {
            setLoading(false);
            history.push('/patients');
            throw new Error('AbortError');
          }
          // if response is not a 2xx or 404, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then(([patientData, encounterData]) => {
          setLoading(false);
          setPatientInfo(patientData);
          setEncounters(encounterData);
          console.log(encounterData);
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
        // // find item to delete in reservations list
        // // eslint-disable-next-line no-shadow
        // const deletedIndex = patientInfo.findIndex((patientInfo) => patientInfo.id === id);
        // const newPatients = [...patientInfo];
        // // create copy of reservations array and remove the deleted one
        // newPatients.splice(deletedIndex, 1);
        // setLoading(false);
        // setPatientInfo(newPatients);
      })
      .catch(() => {
        setLoading(false);
        setApiError(true);
      });
    history.push('/patients');
  };

  /**
* @name createEncounterDisplays
* @description creates card displays for each encounter object
* @return component[]
*/
  const createEncounterDisplays = () => {
    let encounterDisplays = [];

    // only if we have room and reservation data to work with
    if (encounters.length > 0) {
      // map over each reservation to create a display card
      encounterDisplays = encounters.map((encounter) => (
        <Card key={encounter.id}>
          <p className={style.Text}>
            <strong>ID: </strong>
            {encounter.id}
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
            <strong>Date: </strong>
            {encounter.date}
          </p>
          <div className={style.Container}>
            <Button color="Primary" type="button" onClick={() => setEncounterModal(true)}>view details</Button>
            {encounterModal
            && (
            <EncounterModal
              message="Oops something went wrong"
              reset={() => setEncounterModal(false)}
              encounter={encounter}
            />
            )}
          </div>
        </Card>
      ));
    }
    return encounterDisplays;
  };
  return (
    <>
      <Card key={patientInfo.id}>
        <h1>Patient Details</h1>
        <p className={style.Text}>
          <strong>ID: </strong>
          {patientInfo.id}
        </p>
        <p className={style.Text}>
          <strong>Name: </strong>
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
          <strong>Weight (lbs): </strong>
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
      <div className={style.container}>
        <div className={style.Header}>
          <h1 className={style.headingMargin}>Encounters</h1>
          <Link to="/patients/create"><Button color="Primary" type="button">Add New Encounter</Button></Link>
        </div>
        {loading && <Spinner />}
        {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
        <div className={style.grid}>
          {createEncounterDisplays()}
        </div>
      </div>
    </>
  );
};
export default PatientDetails;
