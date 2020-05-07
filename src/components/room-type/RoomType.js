import React, { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import Textarea from '../textarea/Textarea';
import Checkbox from '../checkbox/Checkbox';
import Spinner from '../spinner/Spinner';
import { isValidNumber } from '../../utils/validation';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name RoomType
 * @description Room-type page
 * @param {*} props user
 * @return component
 */
const RoomType = ({ user }) => {
  // Hooks to work with URL
  const history = useHistory();
  const params = useParams();

  // state for api errors and loading
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  // state for room-types
  const [room, setRoom] = useState({
    id: null,
    name: '',
    description: '',
    rate: '',
    active: true
  });

  // state to track input errors
  const [inputErrors, setInputErrors] = useState({
    name: false,
    rate: false
  });

  useEffect(() => {
    // if there is an id in the URL, we are in edit mode
    if (params.id) {
      setLoading(true);
      HttpHelper(`/room-types/${params.id}`, 'GET')
        .then((response) => {
          // if response is of 2xx
          if (response.ok) {
            return response.json();
          }
          // if response is not a 2xx, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then((data) => {
          setLoading(false);
          setRoom(data);
        })
        .catch(() => {
          setLoading(false);
          setApiError(true);
        });
    }
  }, [params.id]);

  /**
 * @name handleSubmit
 * @description handle form submission
 * @param {event} event
 */
  const handleSubmit = (event) => {
    // need to prevent default submit behavior of form
    event.preventDefault();
    // object to track which inputs have errors
    const errors = {
      name: false,
      rate: false
    };

    let invalidForm = false;

    if (room.name.length < 3) {
      errors.name = true;
      invalidForm = true;
    }
    if (!isValidNumber(room.rate)) {
      errors.rate = true;
      invalidForm = true;
    }

    if (!invalidForm) {
      // method and route depend on if we are editing or creating
      const method = params.id ? 'PUT' : 'POST';
      const route = params.id ? `/room-types/${params.id}` : '/room-types';

      setLoading(true);
      HttpHelper(route, method, room)
        .then((response) => {
          if (response.ok) {
            setLoading(false);
            // on success, redirect to room-types page
            history.push('/room-types');
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
    setRoom({ ...room, [input]: event.target.value });
  };

  /**
 * @name handleChange
 * @description update input state on change for checkbox
 * @param {event} event
 */
  const handleCheck = (event) => {
    setRoom({ ...room, active: event.target.checked });
  };

  // if user is not a manager, should be redirected
  if (user.role !== 'manager') {
    return <Redirect to="/reservations" />;
  }

  return (
    <>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}

      <Form
        title={params.id ? 'Edit Room Type' : 'Create Room Type'}
        action={params.id ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="Room Type"
          type="text"
          error={inputErrors.name}
          message="Must be at least 3 characters"
          value={room.name}
          onChange={(event) => handleChange(event, 'name')}
        />
        <Textarea
          label="Description"
          value={room.description}
          onChange={(event) => handleChange(event, 'description')}
        />
        <Input
          label="Rate"
          type="number"
          error={inputErrors.rate}
          message="Must be number greater than zero"
          value={room.rate}
          onChange={(event) => handleChange(event, 'rate')}
        />
        <Checkbox
          label="Active"
          checked={room.active}
          onChange={handleCheck}
        />
      </Form>
    </>
  );
};

export default RoomType;
