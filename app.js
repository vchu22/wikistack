const express = require('express');
const app = express();
const morgan = require('morgan');
const wikipage = require('./views/wikipage');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use('/wiki', wikiRouter);

// connect
models.db.authenticate().then(() => {
  console.log('connected to the database');
});
app.get('/', (req, res) => {
  res.redirect('/wiki');
  // res.send(wikipage(testPage, 'author'));
});

const init = async () => {
  await models.db.sync({ force: true });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
};
init();
