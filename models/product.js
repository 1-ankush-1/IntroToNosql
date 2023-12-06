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
    db.collection('products').insertOne(this).then(result => {    //perform operation on which collection (on new operation it will create collection if not exist)
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

}

module.exports = Product;
