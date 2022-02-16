/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../../form/Form';
import Input from '../../input/Input';
import Modal from '../../modal/Modal';
import Spinner from '../../spinner/Spinner';
import { isValidEmail } from '../../../utils/validation';
import HttpHelper from '../../../utils/HttpHelper';

/**
 * @name
 * @description
 * @param {*} props
 * @return
 */
const Patient = () => {
  // Hooks to work with URL
  const history = useHistory();
  const params = useParams();

  // state for api errors and loading
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  // state for patient fields
  const [patient, setPatient] = useState({
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

  // state to track input errors
  const [inputErrors, setInputErrors] = useState({
    firstName: false,
    lastName: false,
    ssn: false,
    email: false,
    address: {
      street: false,
      city: false,
      state: false,
      zipCode: false
    },
    age: false,
    height: false,
    weight: false,
    insurance: false,
    gender: false
  });

  useEffect(() => {
    // if there is an id in the URL, we are in edit mode
    if (params.id) {
      setLoading(true);
      // we need both the room-types and reservations so we can map the room-types names
      // with the reservations roomTypeId for display purposes
      Promise.all([HttpHelper(`/patients/${params.id}`, 'GET')])
        .then(([patientRes]) => {
          if (patientRes.ok) {
            // once both api calls have resolved successfully check if both are 2xx responses
            return Promise.all([patientRes.json()]);
          }
          // redirect to trigger NotFound page is server returns 404
          if (patientRes.status === 404) {
            setLoading(false);
            history.push(`/patients/${params.id}`);
            throw new Error('AbortError');
          }
          // if either response is not a 2xx or 404, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then(([patientData]) => {
          // set data for room-types and reservations
          setLoading(false);
          setPatient(patientData);
        })
        .catch((error) => {
          if (error.message === 'AbortError') return;
          // set errors if not a cancel request
          setLoading(false);
          setApiError(true);
        });
    }
  }, [params.id, history]);

  /**
 * @name handleSubmit
 * @description
 * @param {*} props
 * @return
 */
  const handleSubmit = (event) => {
    // need to prevent default submit behavior of form
    event.preventDefault();
    // object to track which inputs have errors
    const errors = {
      firstName: false,
      lastName: false,
      ssn: false,
      email: false,
      address: {
        street: false,
        city: false,
        state: false,
        zipCode: false
      },
      age: false,
      height: false,
      weight: false,
      insurance: false,
      gender: false
    };
    let invalidForm = false;

    if (!isValidEmail(patient.email)) {
      errors.email = false;
      invalidForm = false;
    }

    if (!invalidForm) {
      // method and route depend on if we are editing or creating
      const method = params.id ? 'PUT' : 'POST';
      const route = params.id ? `/patients/${params.id}` : '/patients';
      setLoading(true);
      HttpHelper(route, method, patient)
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            // on success, redirect to reservations page
            history.push('/patients');
          } else {
            // throw error to move into catch block
            throw new Error('oops something went wrong');
          }
        })
        .catch(() => {
          setLoading(false);
          setApiError(true);
        });
    } else {
      setInputErrors(errors);
    }
  };

  /**
 * @name handleChange
 * @description update input state on change
 * @param {event} event
 * @param {string} input
 */
  const handleChange = (event, input) => {
    if (inputErrors[input]) {
      setInputErrors({ ...inputErrors, [input]: false });
    }
    setPatient({ ...patient, [input]: event.target.value });
  };

  return (
    <>
      <Form
        title={params.id ? 'Edit Patient information' : 'Add new patient'}
        action={params.id ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="First Name"
          type="text"
          error={inputErrors.firstName}
          message="First Name required"
          value={patient.firstName}
          onChange={(event) => handleChange(event, 'firstName')}
        />
        <Input
          label="Last Name"
          type="text"
          error={inputErrors.lastName}
          message="Last Name required"
          value={patient.lastName}
          onChange={(event) => handleChange(event, 'lastName')}
        />
        <Input
          label="Social Security Number"
          type="text"
          error={inputErrors.ssn}
          message="SSN must be in format XX-XX-XXXX"
          value={patient.ssn}
          onChange={(event) => handleChange(event, 'ssn')}
        />
        <Input
          label="E-mail"
          type="email"
          error={inputErrors.email}
          message="Must be valid email"
          value={patient.email}
          onChange={(event) => handleChange(event, 'email')}
        />
        <Input
          label="Street"
          type="text"
          error={inputErrors.address.street}
          message="Field is required"
          value={patient.address.street}
          onChange={(event) => {
            const newObj = { ...patient };
            newObj.address.street = event.target.value;
            setPatient(newObj);
          }}

        />
        <Input
          label="City"
          type="text"
          error={inputErrors.address.city}
          message="Field is required"
          value={patient.address.city}
          onChange={(event) => {
            const newObj = { ...patient };
            newObj.address.city = event.target.value;
            setPatient(newObj);
          }}
        />
        <Input
          label="State"
          type="text"
          error={inputErrors.address.state}
          message="Field is required"
          value={patient.address.state}
          onChange={(event) => {
            const newObj = { ...patient };
            newObj.address.state = event.target.value;
            setPatient(newObj);
          }}
        />
        <Input
          label="Zipcode"
          type="text"
          error={inputErrors.address.zipCode}
          message="Field is required"
          value={patient.address.postal}
          onChange={(event) => {
            const newObj = { ...patient };
            newObj.address.postal = event.target.value;
            setPatient(newObj);
          }}
        />
        <Input
          label="Age"
          type="text"
          error={inputErrors.age}
          message=""
          value={patient.age}
          onChange={(event) => handleChange(event, 'age')}
        />
        <Input
          label="Height"
          type="text"
          error={inputErrors.height}
          message=""
          value={patient.height}
          onChange={(event) => handleChange(event, 'height')}
        />
        <Input
          label="Weight"
          type="text"
          error={inputErrors.weight}
          message=""
          value={patient.weight}
          onChange={(event) => handleChange(event, 'weight')}
        />
        <Input
          label="Insurance"
          type="text"
          error={inputErrors.insurance}
          message="Field is required"
          value={patient.insurance}
          onChange={(event) => handleChange(event, 'insurance')}
        />
        <Input
          label="Gender"
          type="text"
          error={inputErrors.gender}
          message="Field is required"
          value={patient.gender}
          onChange={(event) => handleChange(event, 'gender')}
        />
      </Form>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
    </>
  );
};

export default Patient;
