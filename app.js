const express = require('express');
const app = express();
const morgan = require('morgan');
const wikiPage = require('./views/wikiPage');
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

// connect
db.authenticate().then(() => {
  console.log('connected to the database');
});
app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const init = async () => {
  await db.sync({ force: true });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
};
init();
