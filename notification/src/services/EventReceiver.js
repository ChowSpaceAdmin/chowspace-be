const amqp = require('amqplib');
const _ = require('lodash');
const config = require('../server/config');

class EventReceiver {

    // Queue names and Events
    static get VERIFY() {
        return 'notification-verify';
    }
    
    static get RESERVATION_CREATED() {
        return 'notification-reservation-created';
    }

    static get RESERVATION_CONFIRM() {
        return 'notification-reservation-confirm';
    }

    static get REVIEW_CREATED() {
        return 'notification-review-created';
    }
    
    static get REVIEW_UPDATED() {
        return 'notification-review-updated';
    }

    static get REVIEW_REPLIED() {
        return 'notification-review-replied';
    }

    constructor(listeners) {
        this.options = {
            protocol: 'amqp',
            hostname: config.RABBITMQ_HOST,
            username: config.RABBITMQ_DEFAULT_USER,
            password: config.RABBITMQ_DEFAULT_PASS,
            framemax: 0
        };
        this.connection = null;
        this.channel = null;
        this.connect();

        this.listeners = listeners;

        // Queue Name : Exchange
        this.binding = {
            [EventReceiver.VERIFY]: 'verify-place',
            [EventReceiver.RESERVATION_CREATED]: 'reservation-created',
            [EventReceiver.RESERVATION_CONFIRM]: 'reservation-confirm',
            [EventReceiver.REVIEW_CREATED]: 'review-created',
            [EventReceiver.REVIEW_UPDATED]: 'review-updated',
            [EventReceiver.REVIEW_REPLIED]: 'review-replied'
        };

    }

    connect() {
        
        amqp.connect(this.options)
            .then(connection => {
                this.connection = connection;

                return this.connection.createChannel();
            })
            .then(channel => {
                this.channel = channel;

                // Create Exchange and Queue
                let queues = _.keys(this.binding);
                let promises = [];

                queues.forEach(queue => {
                    let exchange = this.binding[queue];
                    this.channel.assertExchange(exchange, 'fanout', {durable: true});
                    promises.push(this.channel.assertQueue(queue, {durable: true}));
                });

                return Promise.all(promises);
            })
            .then(queues => {

                // Bind Exchange and Queue
                queues.forEach(q => {
                    let exchange = this.binding[q.queue];
                    this.channel.bindQueue(q.queue, exchange, '');
                });

                // Add Listener to queue
                this.listeners.forEach(l => {
                    this.channel.consume(l.event, (msg) => {
                        if (msg.content) {
                            l.callback(JSON.parse(msg.content.toString()));
                        }
                    }, {
                        noAck: true
                    });
                });

                console.log('Connected to Rabbitmq.');
            })
            .catch(err => {
                console.log('Error Connecting to Rabbitmq. Retrying in 5 sec.');
                setTimeout(() => {
                    this.connect();
                }, 5000);
            }); 
    }

    on(event, cb) {
        if (!_.isNull(this.channel)) {
            this.channel.consume(event, (msg) => {
                if (msg.content) {
                    cb(JSON.parse(msg.content.toString()));
                }
            }, {noAck: true});
        } else {
            console.log('Connection is Null. Listener not added.');
        }
    }

}

module.exports = EventReceiver;
