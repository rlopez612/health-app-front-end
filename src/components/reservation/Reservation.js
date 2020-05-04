import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Dropdown from '../dropdown/Dropdown';
import Modal from '../modal/Modal';
import { isValidEmail, isValidDate, isValidNumber } from '../../utils/validation';

const dummyReservs = [
  {
    id: '1',
    user: 'manger',
    guestEmail: 'email@email.com',
    roomType: '1',
    checkInDate: '03-04-2020',
    numberOfNights: 3
  },
  {
    id: '2',
    user: 'employee',
    guestEmail: 'email@email.com',
    roomType: '2',
    checkInDate: '03-04-2020',
    numberOfNights: 5
  }
];
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

const Reservation = (props) => {
  const { user } = props;
  const history = useHistory();
  const params = useParams();

  const [apiError, setApiError] = useState(false);

  const [reservation, setReservation] = useState({
    id: null,
    user: user.user,
    guestEmail: '',
    roomType: '',
    checkInDate: '',
    numberOfNights: ''
  });

  const [errors, setErrors] = useState({
    guestEmail: false,
    roomType: false,
    checkInDate: false,
    numberOfNights: false
  });

  useEffect(() => {
    if (params.id) {
      const res = dummyReservs.find((res) => res.id === params.id);
      setReservation(res);
    }
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {
      guestEmail: false,
      roomType: false,
      checkInDate: false,
      numberOfNights: false
    };
    let invalidForm = false;

    if (!isValidEmail(reservation.guestEmail)) {
      errors.guestEmail = true;
      invalidForm = true;
    }
    if (!isValidDate(reservation.checkInDate)) {
      errors.checkInDate = true;
      invalidForm = true;
    }
    if (!isValidNumber(reservation.numberOfNights)) {
      errors.numberOfNights = true;
      invalidForm = true;
    }
    if (reservation.roomType === '') {
      errors.roomType = true;
      invalidForm = true;
    }

    if (!invalidForm) {
      console.log('submit');
      history.push('/reservations');
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (event, input) => {
    if (errors[input]) {
      setErrors({ ...errors, [input]: false });
    }
    setReservation({ ...reservation, [input]: event.target.value });
  };

  const activeRoomTypes = dummyRooms.filter((room) => room.active);

  return (
    <>
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}

      <Form
        title={params.id ? 'Edit Reservation' : 'Create Reservation'}
        action={params.id ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="Guest Email"
          type="email"
          error={errors.guestEmail}
          message="Must be a valid email"
          value={reservation.guestEmail}
          onChange={(event) => handleChange(event, 'guestEmail')}
        />
        <Input
          label="Check-in Date"
          type="text"
          error={errors.checkInDate}
          message="Date must be mm-dd-yyyy"
          value={reservation.checkInDate}
          onChange={(event) => handleChange(event, 'checkInDate')}
        />
        <Input
          label="Number of Nights"
          type="number"
          error={errors.numberOfNights}
          message="Must be number greater than zero"
          value={reservation.numberOfNights}
          onChange={(event) => handleChange(event, 'numberOfNights')}
        />
        <Dropdown
          label="Room Type"
          error={errors.roomType}
          message="Must select a room type"
          options={activeRoomTypes}
          value={reservation.roomType}
          onChange={(event) => handleChange(event, 'roomType')}
        />
      </Form>
    </>
  );
};

export default Reservation;
