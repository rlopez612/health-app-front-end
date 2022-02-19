import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Patient-details.module.css';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name PatientsPage
 * @description patients page
 * @return component
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    setLoading(true);
    HttpHelper('/patients', 'GET')
      .then((patientsRes) => {
        // once both api calls have resolved successfully check if both are 2xx responses
        if (patientsRes.ok) {
          return patientsRes.json();
        }
        // if either response is not a 2xx, throw error to move into catch block
        throw new Error('Something went wrong');
      })
      .then((patientData) => {
        setLoading(false);
        setPatients(patientData);
      })
      .catch(() => {
        // set errors
        setLoading(false);
        setApiError(true);
      });
  }, []);

  /**
 * @name
 * @description
 * @param {*} props
 * @return
 */

  /**
* @name createPatientDisplays
* @description creates card displays for each patient
* @return component[]
*/
  const createPatientDisplays = () => {
    let patientDisplays = [];

    if (patients.length > 0) {
      patientDisplays = patients.map((patient) => (
        <Card key={patient.id}>
          <p className={style.Text}>
            <strong>Name: </strong>
            {`${patient.firstName} ${patient.lastName}`}
          </p>
          <p className={style.Text}>
            <strong>Age: </strong>
            {patient.age}
          </p>
          <p className={style.Text}>
            <strong>Gender: </strong>
            {patient.gender}
          </p>
          <div className={style.Container}>
            <Link className={style.Link} to={`/patients/${patient.id}`}><Button color="Primary" type="button">Patient Details</Button></Link>
          </div>
        </Card>
      ));
    }
    return patientDisplays;
  };

  return (
    <div className={style.container}>
      <div className={style.Header}>
        <h1 className={style.headingMargin}>Patients</h1>
        <Link to="/patients/create"><Button color="Primary" type="button">Add New Patient</Button></Link>
      </div>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
      <div className={style.grid}>
        {createPatientDisplays()}
      </div>
    </div>
  );
};

export default PatientsPage;
