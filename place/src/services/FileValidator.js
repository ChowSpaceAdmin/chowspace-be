const path = require('path');

class FileValidator {

    isValid(bufferFile, extensionRegex, maxSize) {
        if (!bufferFile) {
            return false;
        }
    
        const extension = path.extname(bufferFile.originalname);
        if (extension.match(extensionRegex) && bufferFile.size < maxSize) {
            return true;
        } 
        
        return false;
    }

}

module.exports = new FileValidator();
