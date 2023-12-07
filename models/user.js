const { dbInstance } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id;
  }

  save() {
    const db = dbInstance();
    return db.collection("users").insertOne(this);
  }

  static fetchById(userId) {
    const db = dbInstance();
    return db.collection("users").find({ _id: new mongodb.ObjectId(userId) }).next()
  }

}

module.exports = User;
