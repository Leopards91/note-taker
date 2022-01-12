const router = require('express').Router();
const path = require('path');

// /notes responds with /notes.html
router.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// all other routes responds with /index.html
router.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;