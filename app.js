const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const errorController = require('./controllers/error');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6572ab7b3b8105aaa38e5d80').then(user => {
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

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.0cghwlb.mongodb.net/`).then(result => {
  //if no user create one
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: "rahul",
        email: "rahul@gmail.com",
        cart: {
          items: []
        }
      })
      user.save();
    }
  }).catch(new Error("failed to find user"));

  app.listen(3000, () => {
    console.log("server started");
  })
}).catch(err => console.log(err));
