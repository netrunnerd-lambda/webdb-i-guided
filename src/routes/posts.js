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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await db('posts').where({id});

    if (!post) {
      res.status(404).json({
        message: "Post does not exist.",
        success: false
      })
    } else {
      res.status(200).json({
        post,
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Post could not be retrieved.",
      success: false
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('posts').where({id}).del();

    if (!deleted) {
      res.status(404).json({
        message: "Post does not exist.",
        success: false
      });
    } else {
      res.status(200).json({
        message: `Post ${id} deleted.`,
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Post could not be deleted.",
      success: false
    });
  }
});

router.post('/', async (req, res) => {
  const newPost = req.body;

  try {
    let post = await db('posts').insert(newPost);
    
    if (post) {
      const [id] = post;

      [post] = await db('posts').where({id});

      res.status(200).json({
        post,
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Post could not be saved.",
      success: false
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  try {
    let post = await db('posts').where({id}).update(updatedPost);

    if (post) {
      [post] = await db('posts').where({id});

      res.status(200).json({
        post,
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Post could not be modified.",
      success: false
    });
  }
});

module.exports = router;