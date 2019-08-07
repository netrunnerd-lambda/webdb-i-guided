const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json({ message: "The Post API", success: true }));

router.use('/posts', require('./posts'));

module.exports = router;