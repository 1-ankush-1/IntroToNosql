const { MongoClient } = require('mongodb');

let clientInstance;
exports.DbConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.0cghwlb.mongodb.net/`)
    .then(client => {
      clientInstance = client.db();     //storing the dbconnection
      callback();
    }).catch(err => {
      console.log(err)
      throw err;
    });
}

//connecting once all operation are performed on this instance
exports.dbInstance = () => {
  if (clientInstance) {
    return clientInstance
  }
  throw "no database found";
}




