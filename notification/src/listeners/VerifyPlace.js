class VerifyPlace {

    static listen(io, data) {
        const user = data.user;
        if (io.sockets.adapter.rooms[user]) {
            let result;
            if (data.isVerified) {
                result = 'verified';
            } else {
                result = 'not verified';
            }
            io.to(user).emit('MESSAGE', `Your Place - ${data.name} has status set to<br>${result}`);
        }
    }
}

module.exports = VerifyPlace;
