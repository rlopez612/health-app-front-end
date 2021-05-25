import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Dropdown from '../dropdown/Dropdown';
import Modal from '../modal/Modal';
import Spinner from '../spinner/Spinner';
import { isValidEmail, isValidDate, isValidNumber } from '../../utils/validation';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name
 * @description
 * @param {*} props
 * @return
 */
const Reservation = ({ user }) => {
  // Hooks to work with URL
  const history = useHistory();
  const params = useParams();

  // state for api errors and loading
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  // state for room-types and reservations
  const [rooms, setRooms] = useState([]);
  const [reservation, setReservation] = useState({
    id: null,
    user: user.email,
    guestEmail: '',
    roomTypeId: '',
    checkInDate: '',
    numberOfNights: ''
  });

  // state to track input errors
  const [inputErrors, setInputErrors] = useState({
    guestEmail: false,
    roomTypeId: false,
    checkInDate: false,
    numberOfNights: false
  });

  useEffect(() => {
    // create variable for cancelling api request
    const cancel = new AbortController();
    // if there is an id in the URL, we are in edit mode
    if (params.id) {
      setLoading(true);
      // we need both the room-types and reservations so we can map the room-types names
      // with the reservations roomTypeId for display purposes
      Promise.all([HttpHelper(`/reservations/${params.id}`, 'GET'), HttpHelper('/room-types', 'GET')])
        .then(([reservationRes, roomsRes]) => {
          // redirect to trigger NotFound page if server returns 404
          if (reservationRes.status === 404) {
            history.push(`/reservations/${params.id}`);
          } else if (reservationRes.ok && roomsRes.ok) {
            // once both api calls have resolved successfully check if both are 2xx responses
            return Promise.all([reservationRes.json(), roomsRes.json()]);
          }
          // if either response is not a 2xx, throw error to move into catch block
          throw new Error('Something went wrong');
        })
        .then(([reservationData, roomsData]) => {
          // set data for room-types and reservations
          setLoading(false);
          setReservation(reservationData);
          setRooms(roomsData);
        })
        .catch((error) => {
          // set errors if not a cancel request
          if (error.name !== 'AbortError') {
            setLoading(false);
            setApiError(true);
          }
        });
    } else {
      // if there is not an id in the URL, we are in create mode
      setLoading(true);
      // we only need to make one call here since we aren't fetching an existing reservation
      HttpHelper('/room-types', 'GET')
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
          setRooms(data);
        })
        .catch(() => {
          setLoading(false);
          setApiError(true);
        });
    }
    // cleanup function if redirected
    return () => cancel.abort();
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
      guestEmail: false,
      roomTypeId: false,
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
    if (reservation.roomTypeId === '') {
      errors.roomTypeId = true;
      invalidForm = true;
    }

    if (!invalidForm) {
      // method and route depend on if we are editing or creating
      const method = params.id ? 'PUT' : 'POST';
      const route = params.id ? `/reservations/${params.id}` : '/reservations';
      setLoading(true);
      HttpHelper(route, method, reservation)
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            // on success, redirect to reservations page
            history.push('/reservations');
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
    setReservation({ ...reservation, [input]: event.target.value });
  };

  // filter inactive rooms for Dropdown
  const activeRoomTypes = rooms.filter((room) => room.active);

  return (
    <>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}

      <Form
        title={params.id ? 'Edit Reservation' : 'Create Reservation'}
        action={params.id ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
      >
        <Input
          label="Guest Email"
          type="email"
          error={inputErrors.guestEmail}
          message="Must be a valid email"
          value={reservation.guestEmail}
          onChange={(event) => handleChange(event, 'guestEmail')}
        />
        <Input
          label="Check-in Date"
          type="text"
          error={inputErrors.checkInDate}
          message="Date must be mm-dd-yyyy"
          value={reservation.checkInDate}
          onChange={(event) => handleChange(event, 'checkInDate')}
        />
        <Input
          label="Number of Nights"
          type="number"
          error={inputErrors.numberOfNights}
          message="Must be number greater than zero"
          value={reservation.numberOfNights}
          onChange={(event) => handleChange(event, 'numberOfNights')}
        />
        <Dropdown
          label="Room Type"
          error={inputErrors.roomTypeId}
          message="Must select a room type"
          options={activeRoomTypes}
          value={reservation.roomTypeId}
          onChange={(event) => handleChange(event, 'roomTypeId')}
        />
      </Form>
    </>
  );
};

export default Reservation;
