import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Reservations.module.css';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name Reservations
 * @description reservations page
 * @return component
 */
const Reservations = () => {
  // reservation and room-types state
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  // api error and loading state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // we need both the room-types and reservations so we can map the room-types names
    // with the reservations roomTypeId for display purposes
    Promise.all([HttpHelper('/reservations', 'GET'), HttpHelper('/room-types', 'GET')])
      .then(([reservationsRes, roomsRes]) => {
        // once both api calls have resolved successfully check if both are 2xx responses
        if (reservationsRes.ok && roomsRes.ok) {
          return Promise.all([reservationsRes.json(), roomsRes.json()]);
        }
        // if either response is not a 2xx, throw error to move into catch block
        throw new Error('Something went wrong');
      })
      .then(([reservationData, roomsData]) => {
        // set data for room-types and reservations
        setLoading(false);
        setReservations(reservationData);
        setRooms(roomsData);
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
    HttpHelper(`/reservations/${id}`, 'DELETE')
      .then((response) => {
        // if delete was not successful 204, throw error to move into catch block
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        // find item to delete in reservations list
        const deletedIndex = reservations.findIndex((reservation) => reservation.id === id);
        const newReservations = [...reservations];
        // create copy of reservations array and remove the deleted one
        newReservations.splice(deletedIndex, 1);
        setLoading(false);
        setReservations(newReservations);
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
  const createReservationDisplays = () => {
    let reservationDisplays = [];

    // only if we have room and reservation data to work with
    if (rooms.length > 0 && reservations.length > 0) {
      // map over each reservation to create a display card
      reservationDisplays = reservations.map((reservation) => {
        // find room-type object that matches reservation room-type id
        const matchingRoom = rooms.find((room) => room.id === reservation.roomTypeId);

        return (
          <Card key={reservation.id}>
            <p className={style.Text}>
              <strong>Guest: </strong>
              {reservation.guestEmail}
            </p>
            <p className={style.Text}>
              <strong>Check-in Date: </strong>
              {reservation.checkInDate}
            </p>
            <p className={style.Text}>
              <strong>Number of Nights: </strong>
              {reservation.numberOfNights}
            </p>
            <p className={style.Text}>
              <strong>Room Type: </strong>
              {matchingRoom.name}
            </p>
            <p className={style.Text}>
              <strong>Total: </strong>
              {matchingRoom.rate * reservation.numberOfNights}
            </p>

            <div className={style.Container}>
              <Link className={style.Link} to={`/reservations/edit/${reservation.id}`}><Button color="Primary" type="button">Edit</Button></Link>
              <Button color="Warn" type="button" onClick={() => handleDelete(reservation.id)}>Delete</Button>
            </div>
          </Card>
        );
      });
    }
    return reservationDisplays;
  };

  return (
    <div>
      {loading && <Spinner />}
      <div className={style.Header}>
        <h1>Reservations</h1>
        <Link to="/reservations/create"><Button color="Primary" type="button">Create</Button></Link>
      </div>

      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
      <div className={style.Container}>
        {createReservationDisplays()}
      </div>
    </div>
  );
};

export default Reservations;
