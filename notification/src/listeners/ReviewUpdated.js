class ReviewUpdated {

    static listen(io, data) {
        const owner = data.owner;
        if (io.sockets.adapter.rooms[owner]) {
            io.to(owner).emit('MESSAGE', `A rating score has been updated<br>${data.title} - ${data.rating}`);
        }
    }
}

module.exports = ReviewUpdated;
