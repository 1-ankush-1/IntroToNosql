const Product = require('../models/product.js');
const mongodb = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user._id
  //creating new instance of product class
  const prod = new Product(title, price, imageUrl, description, null, userId);
  prod.save().then(result => {        //and save method to save
    console.log('Created Product', result);
    res.redirect('/admin/products');
  })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  const prod = new Product();
  prod.fetchById(prodId).then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const prod = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, new mongodb.ObjectId(prodId));
  prod.save().then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  const prod = new Product();
  prod.fetchAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
