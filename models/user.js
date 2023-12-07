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
    //find index
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;      //default quantity
    const updatedCartItems = [...this.cart.items];   //old values
    if (cartProductIndex >= 0) {   //if index exist update quantity
      newQuantity = Number(this.cart.items[cartProductIndex].quantity) + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {      //not exist add new 
      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
    }

    //create cart obj
    const updateCart = { items: updatedCartItems };

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
