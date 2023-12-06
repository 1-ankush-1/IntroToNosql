const { DbConnect } = require("../util/database");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    DbConnect(client=>{
      console.log(client);
    })
  }
}

module.exports = Product;
