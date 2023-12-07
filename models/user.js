const { dbInstance } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = dbInstance();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = dbInstance();
    // const cartProducts = this.cart.items.findIndex(cp=>{
    //   return cp._id === product.id;
    // })

    const updateCart = { items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }] };

    return db.collection('users').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updateCart } });
  }

  static fetchById(userId) {
    const db = dbInstance();
    return db.collection("users").find({ _id: new mongodb.ObjectId(userId) }).next()
  }

}

module.exports = User;
