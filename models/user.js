const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }]
  }
})

//creating method with mongoose
userSchema.methods.addToCart = function (product) {
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
    updatedCartItems.push({ productId: product._id, quantity: newQuantity });
  }

  //create cart obj
  const updateCart = { items: updatedCartItems };
  this.cart = updateCart;
  return this.save();
}

module.exports = mongoose.model("User", userSchema);
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = dbInstance();
//     return db.collection("users").insertOne(this);
//   }

//   getCart() {
//     const db = dbInstance();
//     const productsId = this.cart.items.map(i => i.productId);
//     // console.log(itemsIndex);
//     // return
//     return db.collection('products')
//       .find({ _id: { $in: productsId } }).toArray()
//       .then(products => {       //putting the quantities also in the products
//         return products.map(p => {
//           return {
//             ...p, quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           }
//         })
//       });
//   }

//   deleteItemFromCart(productId) {
//     const db = dbInstance();
//     //get all item except this id
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     })

//     //update items
//     return db.collection('users').updateOne(
//       { _id: new mongodb.ObjectId(this._id) }, {
//       $set: { cart: { items: updatedCartItems } }
//     })
//   }

//   addToCart(product) {
//     const db = dbInstance();
//     //find index
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     })

//     let newQuantity = 1;      //default quantity
//     const updatedCartItems = [...this.cart.items];   //old values
//     if (cartProductIndex >= 0) {   //if index exist update quantity
//       newQuantity = Number(this.cart.items[cartProductIndex].quantity) + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {      //not exist add new 
//       updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
//     }

//     //create cart obj
//     const updateCart = { items: updatedCartItems };

//     return db.collection('users').updateOne(
//       { _id: new mongodb.ObjectId(this._id) },
//       { $set: { cart: updateCart } });
//   }

//   addOrder() {
//     const db = dbInstance();
//     return this.getCart().then(products => {
//       const order = {
//         items: products,
//         user: {
//           _id: new mongodb.ObjectId(this._id),
//           name: this.name,
//         }
//       }

//       return db.collection('orders').insertOne(order);
//     }).then(result => {
//       this.cart = { items: [] };

//       return db.collection('users').updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: [] } } });
//     });
//   }

//   getOrder() {
//     const db = dbInstance();
//     return db.collection("orders").find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
//   }

//   static fetchById(userId) {
//     const db = dbInstance();
//     return db.collection("users").find({ _id: new mongodb.ObjectId(userId) }).next()
//   }

// }

