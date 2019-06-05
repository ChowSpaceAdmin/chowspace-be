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

        this.VERIFY_PLACE = 'verify-place';
        
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
                this.channel.assertExchange(this.VERIFY_PLACE, 'fanout', {
                    durable: true
                });

                console.log('Connected to Rabbitmq.');
            })
            .catch(err => {
                console.log('Error Connecting to Rabbitmq. Retrying in 5 sec.', err);
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
