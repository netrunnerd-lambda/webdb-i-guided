const db = require('../database/db-config');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db('posts');

    res.status(200).json({ 
      posts, 
      success: true 
    });
  } catch (error) {
    res.status(500).json({ 
      error, 
      message: "Posts could not be retrieved.", 
      success: false 
    });
  }
});

module.exports = router;