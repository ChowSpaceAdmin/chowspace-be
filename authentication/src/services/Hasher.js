const bcrypt = require('bcryptjs');

const hash = async (text) => {
    const result =  await bcrypt.hash(text, 8);
    return result;
};

const isHash = async (text, hash) => {
    const result = await bcrypt.compare(text, hash);
    return result;
};

module.exports = {
    hash,
    isHash
};
