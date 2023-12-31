const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  const prod = new Product();
  prod.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const prod = new Product();
  prod.fetchById(prodId).then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  const prod = new Product();
  prod.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart(req.user._id).then(product => {
    // Product
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: product
    });
  }).catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const prod = new Product();
  prod.fetchById(prodId).then(product => {
    return req.user.addToCart(product);
  }).then(result => {
    // console.log(result);
    res.redirect('/cart');
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId).then(result => {
    res.redirect('/cart');
  })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(result => {
    res.redirect('/orders');
  }).catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
  req.user.getOrder().then(orders => {
    console.log(orders[0].items)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
    .catch(err => console.log(err));
}; 
