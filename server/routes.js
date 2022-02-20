const router = require('express').Router();

router.get('/data', (req, res) => {
    res.status(200).json({ data: 'hello' });
})

module.exports = router;