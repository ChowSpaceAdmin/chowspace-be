const express = require('express');
const path = require('path');

const config = require('../server/config');
const Uploads = require('../middlewares/Uploads');

const router = express.Router();

router.post('/store/static', Uploads.single, (req, res) => {
    const filename = req.file.filename;
    const location = path.join(config.UPLOAD_ROUTE, filename);

    res.send({location});
});

module.exports = router;
