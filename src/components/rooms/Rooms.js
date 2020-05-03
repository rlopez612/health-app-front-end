import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Rooms.module.css';
import Button from '../button/Button';
import Card from '../card/Card';
import Modal from '../modal/Modal';

const dummyRooms = [
  {
    id: 1,
    roomType: 'Queen',
    description: 'desc',
    rate: 200,
    active: true
  },
  {
    id: 2,
    roomType: 'King',
    description: 'desc',
    rate: 300,
    active: false
  }
]

const Rooms = props => {
  const [apiError, setApiError] = useState(false);
  const [rooms, setRooms] = useState(dummyRooms);

  // useEffect(() => {
  //   try {

  //   }
  // }, [])

  const roomDisplays = rooms.map(room => {
    return <Card key={room.id}>
      <p className={style.Text}><strong>Room Type: </strong>{room.roomType}</p>
      <p className={style.Text}><strong>Description: </strong>{room.description}</p>
      <p className={style.Text}><strong>Rate: </strong>{room.rate}</p>
      <p className={style.Text}><strong>Status: </strong>{room.active ? 'Active' : 'Inactive'}</p>

      <div className={style.Container}>
        <Link className={style.Link} to={`/rooms/edit/${room.id}`}><Button color="Primary">Edit</Button></Link>
      </div>
    </Card>
  });

  return <div>
    <div className={style.Header}>
      <h1>Rooms</h1>
      <Link to='/rooms/create'><Button color="Primary">Create</Button></Link>
    </div>

    {apiError && <Modal message="Oops something went wrong" reset={() => setApiError(false)} />}
    <div className={style.Container}>
      {roomDisplays}
    </div>
  </div>
}

export default Rooms;
