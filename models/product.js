const { dbInstance } = require("../util/database");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = dbInstance();                                      //perform operations on respective db
    //this refer to current object of product class
    return new Promise((resolve, reject) => {
      db.collection('products').insertOne(this).then(result => {    //perform operation on which collection (on new operation it will create collection if not exist)
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    })
  }

  fetchAll() {
    const db = dbInstance();
    return new Promise((resolve, reject) => {
      db.collection('products').find().toArray().then(result => {    //because find doesnt return a promise so using toArrray
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    })
  }

}

module.exports = Product;
