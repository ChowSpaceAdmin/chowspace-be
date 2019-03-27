const express = require('express');

const router = express.Router();

router.post('/account', (req, res) => {
    res.send({
        'data': 'account'
    });
});

module.exports = router;
