class ReservationCreated {

    static listen(io, data) {
        const owner = data.owner;
        if (io.sockets.adapter.rooms[owner]) {
            io.to(owner).emit('MESSAGE', `New Reservation has been added<br>from ${data.from} till ${data.till}`);
        }
    }
}

module.exports = ReservationCreated;
