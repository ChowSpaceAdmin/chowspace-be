const EventReceiver = require('./services/EventReceiver');

let listeners = [
    {
        event: EventReceiver.VERIFY,
        callback: (data) => {
            console.log('verify', data);
        }
    },
    {
        event: EventReceiver.RESERVATION_CREATED,
        callback: (data) => {
            console.log('reservation created', data);
        }
    },
    {
        event: EventReceiver.RESERVATION_CONFIRM,
        callback: (data) => {
            console.log('reservation confirm', data);
        }
    },
    {
        event: EventReceiver.REVIEW_CREATED,
        callback: (data) => {
            console.log('review created', data);
        }
    },
    {
        event: EventReceiver.REVIEW_UPDATED,
        callback: (data) => {
            console.log('review updated', data);
        }
    },
    {
        event: EventReceiver.REVIEW_REPLIED,
        callback: (data) => {
            console.log('review replied', data);
        }
    }
];

const receiver = new EventReceiver(listeners);
