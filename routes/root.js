const express = require('express');
const router = express.Router();
const path = require('path');

// root endpoint GET request should return an HTML document.
router.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;