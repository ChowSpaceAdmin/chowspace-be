class ReviewReplied {

    static listen(io, data) {
        const user = data.user;
        if (io.sockets.adapter.rooms[user]) {
            io.to(user).emit('MESSAGE', `Your rating has been replied<br>${data.reply}`);
        }
    }
}

module.exports = ReviewReplied;
