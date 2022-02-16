import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Reservations.module.css';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name Patients
 * @description patients page
 * @return component
 */
const Patients = () => {
  // reservation and room-types state
  const [patients, setPatients] = useState([]);
  //   const [rooms, setRooms] = useState([]);
  // api error and loading state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // we need both the room-types and reservations so we can map the room-types names
    // with the reservations roomTypeId for display purposes
    Promise.all([HttpHelper('/patients', 'GET')])
      .then(([patientsRes]) => {
        // once both api calls have resolved successfully check if both are 2xx responses
        if (patientsRes.ok) {
          return Promise.all([patientsRes.json()]);
        }
        // if either response is not a 2xx, throw error to move into catch block
        throw new Error('Something went wrong');
      })
      .then(([patientData]) => {
        // set data for room-types and reservations
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
  const handleDelete = (id) => {
    setLoading(true);
    HttpHelper(`/patients/${id}`, 'DELETE')
      .then((response) => {
        // if delete was not successful 204, throw error to move into catch block
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        // find item to delete in reservations list
        const deletedIndex = patients.findIndex((patient) => patient.id === id);
        const newPatients = [...patients];
        // create copy of reservations array and remove the deleted one
        newPatients.splice(deletedIndex, 1);
        setLoading(false);
        setPatients(newPatients);
      })
      .catch(() => {
        setLoading(false);
        setApiError(true);
      });
  };

  /**
* @name createReservationDisplays
* @description creates card displays for each reservation object
* @return component[]
*/
  const createPatientDisplays = () => {
    let patientDisplays = [];

    // only if we have room and reservation data to work with
    if (patients.length > 0) {
      // map over each reservation to create a display card
      // // find room-type object that matches reservation room-type id
      // const matchingRoom = rooms.find((room) => room.id === reservation.roomTypeId);
      patientDisplays = patients.map((patient) => (
        <Card key={patient.id}>
          <p className={style.Text}>
            <strong>Patient: </strong>
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
            <Link className={style.Link} to={`/patients/edit/${patient.id}`}><Button color="Primary" type="button">Edit</Button></Link>
            <Button color="Warn" type="button" onClick={() => handleDelete(patient.id)}>Delete</Button>
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

export default Patients;
