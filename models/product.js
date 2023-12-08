const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',                   //referenec to user
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// class Product {
//   constructor(title, price, imageUrl, description, id,userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = dbInstance();                                      //perform operations on respective db
//     let dbQuery;
//     // console.log(this);
//     // return;
//     if (this._id) {                                          //update old
//       dbQuery = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     } else {                                                 //new create
//       dbQuery = db.collection('products').insertOne(this)
//     }
//     //this refer to current object of product class
//     return new Promise((resolve, reject) => {
//       dbQuery.then(result => {    //perform operation on which collection (on new operation it will create collection if not exist)
//         resolve(result);
//       }).catch(err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   fetchAll() {
//     const db = dbInstance();
//     return new Promise((resolve, reject) => {
//       db.collection('products').find().toArray().then(result => {    //because find doesnt return a promise so using toArrray
//         resolve(result);
//       }).catch(err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   fetchById(prodId) {
//     const db = dbInstance();
//     return new Promise((resolve, reject) => {
//       db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(result => {    //used objectId because of tyoe BSON because find doesnt return a promise so using next to get document
//         resolve(result);
//       }).catch(err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   static deleteById(prodId) {
//     const db = dbInstance();
//     return new Promise((resolve, reject) => {
//       db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(result => {    //used objectId because of tyoe BSON because find doesnt return a promise so using next to get document
//         resolve("deleted");
//       }).catch(err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }
// }


