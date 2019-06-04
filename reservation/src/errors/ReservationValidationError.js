class ReservationValidationError extends Error {

    constructor(obj) {
        super('Invalid Reservation.');
        super.name = 'ReservationValidationError';
        this.errors = obj;
    }

}

module.exports = ReservationValidationError;
