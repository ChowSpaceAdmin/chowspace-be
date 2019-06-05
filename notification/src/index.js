const express = require('express');
const socket = require('socket.io');
const config = require('./server/config');
const EventReceiver = require('./services/EventReceiver');
const ReviewUpdated = require('./listeners/ReviewUpdated');
const ReviewCreated = require('./listeners/ReviewCreated');
const ReviewRepiled = require('./listeners/ReviewReplied');
const VerifyPlace = require('./listeners/VerifyPlace');
const ReservationCreated = require('./listeners/ReservationCreated');
const ReservationConfirmed = require('./listeners/ReservationConfirmed');

// Setup Express
const app = express();
const server = app.listen(config.PORT);

// Setup Socket IO
const io = socket(server);
io.on('connection', (socket) => {

    const id = socket.handshake.query.id;
    if (id) socket.join(id);

});

// Setup Listener
let listeners = [
    {
        event: EventReceiver.VERIFY,
        callback: (data) => VerifyPlace.listen(io, data)
    },
    {
        event: EventReceiver.RESERVATION_CREATED,
        callback: (data) => ReservationCreated.listen(io, data)
    },
    {
        event: EventReceiver.RESERVATION_CONFIRM,
        callback: (data) => ReservationConfirmed.listen(io, data)
    },
    {
        event: EventReceiver.REVIEW_CREATED,
        callback: (data) => ReviewCreated.listen(io, data)
    },
    {
        event: EventReceiver.REVIEW_UPDATED,
        callback: (data) => ReviewUpdated.listen(io, data)
    },
    {
        event: EventReceiver.REVIEW_REPLIED,
        callback: (data) => ReviewRepiled.listen(io, data)
    }
];

const receiver = new EventReceiver(listeners);
