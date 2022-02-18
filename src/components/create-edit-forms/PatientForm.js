/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import Spinner from '../spinner/Spinner';
import {
  isValidEmail, isValidName, isValidSocial, isValidZipcode, isValidNumber
} from '../../utils/validation';
import HttpHelper from '../../utils/HttpHelper';
import Dropdown from '../dropdown/Dropdown';

/**
 * @name PatientForm
 * @description form for creating/editing a patient
 * @param {*} props
 * @return
 */
const PatientForm = () => {
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

  const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const genderOptions = ['Male', 'Female', 'Other'];

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
      postal: false
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
        postal: false
      },
      age: false,
      height: false,
      weight: false,
      insurance: false,
      gender: false
    };
    let invalidForm = false;

    if (!isValidEmail(patient.email)) {
      errors.email = true;
      invalidForm = true;
    }

    if (!isValidName(patient.firstName)) {
      errors.firstName = true;
      invalidForm = true;
    }

    if (!isValidName(patient.lastName)) {
      errors.lastName = true;
      invalidForm = true;
    }

    if (!isValidSocial(patient.ssn)) {
      errors.ssn = true;
      invalidForm = true;
    }

    if (!isValidZipcode(patient.address.postal)) {
      errors.address.postal = true;
      invalidForm = true;
    }

    if (!isValidNumber(patient.age) || patient.age === '') {
      errors.age = true;
      invalidForm = true;
    }

    if (!isValidNumber(patient.weight) || patient.weight === '') {
      errors.weight = true;
      invalidForm = true;
    }

    if (!isValidNumber(patient.height) || patient.height === '') {
      errors.height = true;
      invalidForm = true;
    }

    if (patient.insurance == null || patient.insurance === '') {
      errors.insurance = true;
      invalidForm = true;
    }

    if (patient.gender == null || patient.gender === '') {
      errors.gender = true;
      invalidForm = true;
    }
    if (patient.address.street == null || patient.address.street === '') {
      errors.address.street = true;
      invalidForm = true;
    }
    if (patient.address.city == null || patient.address.city === '') {
      errors.address.city = true;
      invalidForm = true;
    }
    if (patient.address.state == null || patient.address.state === '') {
      errors.address.state = true;
      invalidForm = true;
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
          message="SSN must be in format XXX-XX-XXXX"
          value={patient.ssn}
          onChange={(event) => handleChange(event, 'ssn')}
        />
        <Input
          label="E-mail"
          type="email"
          error={inputErrors.email}
          message="Valid email required"
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
        <Dropdown
          label="State"
          options={stateAbbreviations}
          error={inputErrors.address.state}
          message="Must select a State"
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
          error={inputErrors.address.postal}
          message="ZipCode required in format XXXXX or XXXXX-XXXX"
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
          message="Field is required, digits only"
          value={patient.age}
          onChange={(event) => handleChange(event, 'age')}
        />
        <Input
          label="Height (inches)"
          type="text"
          error={inputErrors.height}
          message="Field is required, digits only"
          value={patient.height}
          onChange={(event) => handleChange(event, 'height')}
        />
        <Input
          label="Weight (lbs)"
          type="text"
          error={inputErrors.weight}
          message="Field is required, digits only"
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
        <Dropdown
          label="Gender"
          options={genderOptions}
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

export default PatientForm;
