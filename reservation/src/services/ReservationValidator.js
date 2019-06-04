const _ = require('lodash');
const ReservationValidationError = require('../errors/ReservationValidationError');
const PlaceService = require('./Place');

class ReservationValidator {

    async validate(user, space, type, from, till) {

        let errors = {};

        this.validateFields(user, space, type, from, till, errors);
        this._throwError(errors);

        const response = await PlaceService.getPlace(space);

        this.validateSpace(response, errors);
        this._throwError(errors);

        this.validateTiming(response.places[0], type, from, till, errors);
        this._throwError(errors);

        this.validatePrices(response.places[0], type, space, errors);
        this._throwError(errors);

        return response.places[0];

    }

    _throwError(errors) {
        if (!_.isEmpty(errors)) throw new ReservationValidationError(errors);
    }

    validateFields(user, space, type, from, till, errors) {
        
        if (!user || !user.id) errors.user = 'Requires user.';

        if (!space) errors.space = 'Requires space.';

        if (!type) {
            errors.type = 'Requires type.';
        } else {
            this._validateType(type, errors);
        }

        if (!from) {
            errors.from = 'Requires from.';
        } else {
            this._validateDateField(from, errors, 'from');
        }

        if (!till) {
            errors.till = 'Requires till.';
        } else {
            this._validateDateField(till, errors, 'till');
        }
    }

    validateSpace(response, errors) {
        if (_.isEmpty(response.places)) {
            errors.space = 'No such space exists.';
        }
    }

    validateTiming(place, type, from, till, errors) {
        const fromDateTime = new Date(from.year, from.month - 1, from.day, from.hour);
        const tillDateTime = new Date(till.year, till.month - 1, till.day, till.hour);
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        if (tillDateTime <= fromDateTime) {
            errors.timing = 'till date must be after from date.';
        }

        if (type.toUpperCase() == 'HL') {
            if (!(from.day == till.day && from.month == till.month && from.year == till.year)) {
                errors.timing = 'HL type requires reservation on same day.';
            }
            const openTime = place.openTimes.find(time => time.day == days[fromDateTime.getDay()]);
            if (_.isEmpty(openTime)) errors.timing = 'Place is closed on that day.';

            let openfrom = parseInt(openTime.from.split(':')[0]);
            let opentill = parseInt(openTime.till.split(':')[0]);

            if (!(from.hour >= openfrom && from.hour < opentill && 
                    till.hour > openfrom && till.hour <= opentill)) {
                errors.timing = 'Hours must be in between opening hours';
            }
        }
    }

    validatePrices(place, type, space, errors) {
        const renting = place.spaces.find(s => s.id == space);
        const prices = renting.prices.filter(price => price.type == type.toUpperCase());
        if (_.isEmpty(prices)) errors.prices = 'No available prices.';
    }

    _validateDateField(date, errors, name) {
        const fields = ['year', 'month', 'day', 'hour'];
        fields.forEach(field => {

            if (!date[field]) {
                errors[`${name}.${field}`] = `Requires ${field}.`;
            } else {
                if (!_.isNumber(date.year)) {
                    errors[`${name}.${field}`] = `${field} is not a Number.`;
                }
            }

        });
    }

    _validateType(type, errors) {
        let error = false;
        if (!_.isString(type)) {
            error = true;
        } else {
            if (type.toUpperCase() != 'HL' && type.toUpperCase() != 'DL') {
                error = true;
            }
        }

        if (error) errors.type = 'type must be either DL or HL.';
        
    }

}

module.exports = new ReservationValidator();
