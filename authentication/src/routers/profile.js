const express = require('express');

const router = express.Router();

router.post('/profile', (req, res) => {
    res.send({
        'data': 'profile'
    });
});

module.exports = router;
