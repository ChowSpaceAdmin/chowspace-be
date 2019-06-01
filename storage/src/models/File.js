const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const config = require('../server/config');

const writeFile = promisify(fs.writeFile);
const removeFile = promisify(fs.unlink);

const fileSchema = mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

// File Statics
fileSchema.statics.createFile = async function(bufferFile, owner) {
    const random = uuidv4();
    const extension = path.extname(bufferFile.originalname);
    const location = path.join(config.DATA_PATH, `${random}${extension}`);

    await writeFile(location, bufferFile.buffer);
    const file = await this.create({
        location,
        owner
    });
    return file;
};

fileSchema.statics.deleteFile = async function(id) {
    const file = await this.findByIdAndRemove(id);

    if (!file) return false;

    await removeFile(file.location);
    return true;
};

const File = mongoose.model('File', fileSchema);

module.exports = File;
