const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');
});
router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
  // res.send('got to POST /wiki/');
});
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
