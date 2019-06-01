class TimeValidator {

    isValidTime(value) {
        if (value.match(/^[0-9]{2}:[0-9]{2}$/)) {
            const time = value.split(':');
            const hour = parseInt(time[0]);
            const minute = parseInt(time[1]);
            if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
                return true;
            }
        }
        return false;
    }

}

module.exports = new TimeValidator();
