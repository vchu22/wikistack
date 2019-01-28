const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { userList, userPages } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const authors = await User.findAll();
    res.send(userList(authors));
  } catch (err) {
    next(err);
  }
});
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId,
      },
    });

    res.send(userPages(user, pages));
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
