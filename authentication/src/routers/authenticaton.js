const express = require('express');

const router = express.Router();

router.post('/authentication', (req, res) => {
    res.send({
        'data': 'authentication'
    });
});

module.exports = router;
