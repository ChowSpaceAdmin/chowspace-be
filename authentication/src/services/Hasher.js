const bcrypt = require('bcryptjs');

class Hasher {

    async hash(text) {
        const result =  await bcrypt.hash(text, 8);
        return result;
    }
    
    async isHash(text, hash) {
        const result = await bcrypt.compare(text, hash);
        return result;
    }

}

module.exports = new Hasher();
