const amqp = require('amqplib');
const config = require('../server/config');

class EventEmitter {

    constructor() {
        this.options = {
            protocol: 'amqp',
            hostname: config.RABBITMQ_HOST,
            username: config.RABBITMQ_DEFAULT_USER,
            password: config.RABBITMQ_DEFAULT_PASS,
            framemax: 0
        };

        this.RESERVATION_CREATED = 'reservation-created';
        this.RESERVATION_CONFIRM = 'reservation-confirm';

        this.connection = null;
        this.channel = null;
        this.connect();
    }

    connect() {
        
        amqp.connect(this.options)
            .then(connection => {
                this.connection = connection;

                return this.connection.createChannel();
            })
            .then(channel => {
                this.channel = channel;

                // Create Exchange
                this.channel.assertExchange(this.RESERVATION_CREATED, 'fanout', {
                    durable: true
                });
                this.channel.assertExchange(this.RESERVATION_CONFIRM, 'fanout', {
                    durable: true
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

    emit(exchange, data) {
        this.channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));
    }

}

module.exports = new EventEmitter();
