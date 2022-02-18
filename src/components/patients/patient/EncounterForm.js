/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../../form/Form';
import Input from '../../input/Input';
import Modal from '../../modal/Modal';
import Spinner from '../../spinner/Spinner';
import {
  isValidEmail, isValidName, isValidSocial, isValidZipcode, isValidNumber, isValidDate
} from '../../../utils/validation';
import HttpHelper from '../../../utils/HttpHelper';
import Dropdown from '../../dropdown/Dropdown';

/**
 * @name
 * @description
 * @param {*} props
 * @return
 */
const EncounterForm = () => {
  // Hooks to work with URL
  const history = useHistory();
  const params = useParams('/patients/:patientId/encounters/:encounterId');

  const { patientId, encounterId } = params;

  // state for api errors and loading
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  // state for patient fields
  const [encounter, setEncounter] = useState({
    id: '',
    patientId: '',
    notes: '',
    visitCode: '',
    provider: '',
    billingCode: '',
    icd10: '',
    totalCost: '',
    copay: '',
    chiefComplaint: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    date: ''
  });

  // state to track input errors
  const [inputErrors, setInputErrors] = useState({
    notes: false,
    visitCode: false,
    provider: false,
    billingCode: false,
    icd10: false,
    totalCost: false,
    copay: false,
    chiefComplaint: false,
    pulse: false,
    systolic: false,
    diastolic: false,
    date: false
  });

  useEffect(() => {
    // if there is an id in the URL, we are in edit mode
    if (params.encounterId) {
      setLoading(true);
      HttpHelper(`/patients/${params.patientId}/encounters/${params.encounterId}`, 'GET')
        .then((encounterRes) => {
          if (encounterRes.ok) {
            return encounterRes.json();
          }
          // redirect to trigger NotFound page is server returns 404
          if (encounterRes.status === 404) {
            setLoading(false);
            history.push(`/patients/${params.patientId}`);
            throw new Error('AbortError');
          }
          // if either response is not a 2xx or 404, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then((encounterData) => {
          // set data for specific encounter
          setLoading(false);
          setEncounter(encounterData);
        })
        .catch((error) => {
          if (error.message === 'AbortError') return;
          // set errors if not a cancel request
          setLoading(false);
          setApiError(true);
        });
    }
  }, [params.patientId, params.encounterId, history]);

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
      notes: false,
      visitCode: false,
      provider: false,
      billingCode: false,
      icd10: false,
      totalCost: false,
      copay: false,
      chiefComplaint: false,
      pulse: false,
      systolic: false,
      diastolic: false,
      date: false
    };
    let invalidForm = false;

    if (!isValidName(encounter.provider)) {
      errors.provider = true;
      invalidForm = true;
    }

    if (!isValidNumber(encounter.copay) || encounter.copay === '') {
      errors.copay = true;
      invalidForm = true;
    }

    if (!isValidNumber(encounter.totalCost) || encounter.totalCost === '') {
      errors.totalCost = true;
      invalidForm = true;
    }

    if (!isValidNumber(encounter.pulse)) {
      errors.pulse = true;
      invalidForm = true;
    }

    if (!isValidNumber(encounter.systolic)) {
      errors.systolic = true;
      invalidForm = true;
    }

    if (!isValidNumber(encounter.diastolic)) {
      errors.systolic = true;
      invalidForm = true;
    }

    if (!isValidDate(encounter.date)) {
      errors.date = true;
      invalidForm = true;
    }

    if (!invalidForm) {
      // method and route depend on if we are editing or creating
      const method = params.encounterId ? 'PUT' : 'POST';
      const route = params.encounterId ? `/patients/${params.patientId}/encounters/${params.encounterId}` : `/patients/${params.patientId}/encounters/`;
      setLoading(true);
      HttpHelper(route, method, encounter)
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            // on success, redirect to reservations page
            history.push(`/patients/${patientId}`);
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
    setEncounter({ ...encounter, [input]: event.target.value });
  };

  return (
    <>
      <Form
        title={params.encounterId ? 'Edit Encounter' : 'Add new encounter'}
        action={params.encounterId ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="Notes"
          type="text"
          error={inputErrors.notes}
          message="First Name required"
          value={encounter.notes}
          onChange={(event) => handleChange(event, 'notes')}
        />
        <Input
          label="Visit Code"
          type="text"
          error={inputErrors.visitCode}
          message="Last Name required"
          value={encounter.visitCode}
          onChange={(event) => handleChange(event, 'visitCode')}
        />
        <Input
          label="Provider"
          type="text"
          error={inputErrors.provider}
          message="Provider is required"
          value={encounter.provider}
          onChange={(event) => handleChange(event, 'provider')}
        />
        <Input
          label="Billing Code"
          type="text"
          error={inputErrors.billingCode}
          message="Valid email required"
          value={encounter.billingCode}
          onChange={(event) => handleChange(event, 'billingCode')}
        />
        <Input
          label="icd10"
          type="text"
          error={inputErrors.icd10}
          message="Field is required, digits only"
          value={encounter.icd10}
          onChange={(event) => handleChange(event, 'icd10')}
        />
        <Input
          label="Total Cost"
          type="text"
          error={inputErrors.totalCost}
          message="Field is required, digits only"
          value={encounter.totalCost}
          onChange={(event) => handleChange(event, 'totalCost')}
        />
        <Input
          label="Copayment"
          type="text"
          error={inputErrors.copay}
          message="Field is required, digits only"
          value={encounter.copay}
          onChange={(event) => handleChange(event, 'copay')}
        />
        <Input
          label="Chief Complaint"
          type="text"
          error={inputErrors.chiefComplaint}
          message="Field is required"
          value={encounter.chiefComplaint}
          onChange={(event) => handleChange(event, 'chiefComplaint')}
        />
        <Input
          label="Pulse"
          type="text"
          error={inputErrors.pulse}
          message="Field is optional, digits only"
          value={encounter.pulse}
          onChange={(event) => handleChange(event, 'pulse')}
        />
        <Input
          label="Systolic"
          type="text"
          error={inputErrors.systolic}
          message="Field is optional, digits only"
          value={encounter.systolic}
          onChange={(event) => handleChange(event, 'systolic')}
        />
        <Input
          label="Diastolic"
          type="text"
          error={inputErrors.diastolic}
          message="Field is optional, digits only"
          value={encounter.diastolic}
          onChange={(event) => handleChange(event, 'diastolic')}
        />
        <Input
          label="Date"
          type="text"
          error={inputErrors.date}
          message="Valid date required in format YYYY-MM-DD"
          value={encounter.date}
          onChange={(event) => handleChange(event, 'date')}
        />
      </Form>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
    </>
  );
};

export default EncounterForm;
