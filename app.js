const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { DbConnect } = require('./util/database');
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.fetchById('6571830d24be986496b6a41a').then(user => {
    // console.log(user);
    req.user = user;
    next();
  }).catch(err => {
    console.log(err)
    next();
  });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

DbConnect(() => {
  app.listen(3000, () => {
    console.log("server started");
  })
});
