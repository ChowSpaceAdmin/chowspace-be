class ReviewCreated {

    static listen(io, data) {
        const owner = data.owner;
        if (io.sockets.adapter.rooms[owner]) {
            io.to(owner).emit('MESSAGE', `A rating score has been added<br>${data.title} - ${data.rating}`);
        }
    }
}

module.exports = ReviewCreated;
