import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Rooms.module.css';
import Button from '../button/Button';
import Card from '../card/Card';

const dummyReservs = [
    {
        id: 1,
        user: 'manger',
        guestEmail: 'email@email',
        roomType: 1,
        checkInDate: '03/04/20',
        numberOfNights: 3
    },
    {
        id: 2,
        user: 'employee',
        guestEmail: 'email@email',
        roomType: 2,
        checkInDate: '03/04/20',
        numberOfNights: 5
    }
];
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

const Reservations = props => {
    const [reservations, setReservations] = useState(dummyReservs);
    const [rooms, setRooms] = useState(dummyRooms);

    // useEffect(() => {
    //   try {

    //   }
    // }, [])

    const handleDelete = id => {
        console.log('delete', id)
    }

    const reservationDisplays = reservations.map(reservation => {
        const room = rooms.find(room => room.id === reservation.roomType);

        return <Card key={reservation.id}>
            <p className={style.Text}><strong>Guest: </strong>{reservation.guestEmail}</p>
            <p className={style.Text}><strong>Check-in Date: </strong>{reservation.checkInDate}</p>
            <p className={style.Text}><strong>Number of Nights: </strong>{reservation.numberOfNights}</p>
            <p className={style.Text}><strong>Room Type: </strong>{room.roomType}</p>
            <p className={style.Text}><strong>Total: </strong>{room.rate * reservation.numberOfNights}</p>

            <div className={style.Container}>
                <Link className={style.Link} to={`/reservations/edit/${reservation.id}`}><Button color="Primary">Edit</Button></Link>
                <Button color="Warn" onClick={() => handleDelete(reservation.id)}>Delete</Button>
            </div>
        </Card>
    });

    return <div>
        <div className={style.Header}>
            <h1>Reservations</h1>
            <Link to='/reservations/create'><Button color="Primary">Create</Button></Link>
        </div>

        <div className={style.Container}>
            {reservationDisplays}
        </div>
    </div>
}

export default Reservations;