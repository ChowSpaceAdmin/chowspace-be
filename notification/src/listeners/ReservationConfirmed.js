class ReservationConfirmed {

    static listen(io, data) {
        const renter = data.renter;
        if (io.sockets.adapter.rooms[renter]) {
                let msg = `Your reservation has been ${data.status}`;
            if (data.status == 'ACCEPTED') {
                msg += `<br> from ${data.from} till ${data.till}`;
            }
            io.to(renter).emit('MESSAGE', msg);
        }
    }
}

module.exports = ReservationConfirmed;
