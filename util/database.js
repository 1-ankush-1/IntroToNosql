const { MongoClient } = require('mongodb');

exports.DbConnect = () => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.0cghwlb.mongodb.net/`)
    .then(client => {
      console.log("connected successfully");
    }).catch(err => console.log(err));
}




