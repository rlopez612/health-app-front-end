import React, { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import { isValidNumber } from '../../utils/validation';
import Textarea from '../textarea/Textarea';

const dummyRooms = [
  {
    id: '1',
    roomType: 'Queen',
    description: 'desc',
    rate: 200,
    active: false
  },
  {
    id: '2',
    roomType: 'King',
    description: 'desc',
    rate: 300,
    active: true
  },
  {
    id: '3',
    roomType: 'Double Queen',
    description: 'desc',
    rate: 300,
    active: true
  }
];

const Room = props => {
  const { user } = props;
  const history = useHistory();
  const params = useParams();

  const [apiError, setApiError] = useState(false);

  const [room, setRoom] = useState({
    id: null,
    roomType: '',
    description: '',
    rate: '',
    active: true
  });

  const [errors, setErrors] = useState({
    roomType: false,
    rate: false
  });

  useEffect(() => {
    if (params.id) {
      const room = dummyRooms.find(room => room.id === params.id);
      setRoom(room);
    }
  }, [params.id]);

  const handleSubmit = event => {
    event.preventDefault();
    const errors = {
      roomType: false,
      rate: false
    }
    let invalidForm = false;

    if (room.roomType.length < 3) {
      errors.roomType = true;
      invalidForm = true;
    }
    if (!isValidNumber(room.rate)) {
      errors.rate = true;
      invalidForm = true;
    }

    if (!invalidForm) {
      console.log('submit');
      history.push('/rooms');

    } else {
      setErrors(errors);
    }
  }

  const handleChange = (event, input) => {
    if (errors[input]) {
      setErrors({ ...errors, [input]: false })
    }
    setRoom({ ...room, [input]: event.target.value });
  }

  if (user.role !== 'manager') {
    return <Redirect to="/reservations" />
  }

  return (
    <>
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
      <Form
        title={params.id ? 'Edit Room' : 'Create Room'}
        action={params.id ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="Room Type"
          type="text"
          error={errors.roomType}
          message="Must be at least 3 characters"
          value={room.roomType}
          onChange={(event) => handleChange(event, 'roomType')}
        />
        <Textarea
          label="Description"
          type="text"
          value={room.description}
          onChange={(event) => handleChange(event, 'description')}
        />
        <Input
          label="Rate"
          type="number"
          error={errors.rate}
          message="Must be number greater than zero"
          value={room.rate}
          onChange={(event) => handleChange(event, 'rate')}
        />
      </Form>
    </>
  );
}

export default Room;
