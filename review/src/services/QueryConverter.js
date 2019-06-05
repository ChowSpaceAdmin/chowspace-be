const _ = require('lodash');

class QueryConverter {

    constructor() {
        this.BOOLEAN = 'boolean';
        this.ARRAY = 'array';
        this.NUMBER = 'number';
    }

    /**
     * Convert string data to specified type and return it.
     * return null if can't convert
     */
    convert(data, type) {
        if (type == this.BOOLEAN) {
            return this._boolean(data);
        } else if (type == this.NUMBER) {
            return this._number(data);
        } else if (type == this.ARRAY) {
            return this._array(data);
        }
        return null;
    }

    _boolean(data) {
        if (data.match(/^true$/i)) {
            return true;
        } else if (data.match(/^false$/i)) {
            return false;
        }
        return null;
    }

    _number(data) {
        let number = Number(data);
        
        if (_.isNaN(number)) return null;

        return number;
    }

    _array(data) {
        try {
            let result = JSON.parse(data);

            if (_.isArray(result)) {
                return result;
            } 
            
            return null;

        } catch(err) {
            return null;
        }
    }

}

module.exports = new QueryConverter();
