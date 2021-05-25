import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Rooms.module.css';
import Button from '../button/Button';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name RoomTypes
 * @description Room-types page
 * @return component
 */
const RoomTypes = () => {
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setLoading(true);
    HttpHelper('/room-types', 'GET')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
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
  }, []);

  /**
 * @name createRoomTypeDisplays
 * @description creates card to display each room-type
 * @return component[]
 */
  const createRoomTypeDisplays = () => rooms.map((room) => (
    <Card key={room.id}>
      <p className={style.Text}>
        <strong>Room Type: </strong>
        {room.name}
      </p>
      <p className={style.Text}>
        <strong>Description: </strong>
        {room.description}
      </p>
      <p className={style.Text}>
        <strong>Rate: </strong>
        {room.rate}
      </p>
      <p className={style.Text}>
        <strong>Status: </strong>
        {room.active ? 'Active' : 'Inactive'}
      </p>

      <div className={style.Container}>
        <Link className={style.Link} to={`/room-types/edit/${room.id}`}><Button color="Primary" type="button">Edit</Button></Link>
      </div>
    </Card>
  ));

  return (
    <div className={style.container}>
      {loading && <Spinner />}
      {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}

      <div className={style.Header}>
        <h1>Room Types</h1>
        <Link to="/room-types/create"><Button color="Primary" type="button">Create</Button></Link>
      </div>

      <div className={style.flex}>
        {createRoomTypeDisplays()}
      </div>

    </div>
  );
};

export default RoomTypes;
