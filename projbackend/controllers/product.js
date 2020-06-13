const Product = require("./../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found!",
        });
      }
      req.product = product;
      next();
    }); //destructure the fields
  const { name, description, price, category, stock } = fields;

  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }
};

//create
exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) res.status(400).json({ error: "problem with image" });

    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({ error: "Please include all fieldss", fields });
    }

    let product = new Product(fields);

    //handle fie here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big!!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to db
    product.save((err, product) => {
      if (err) res.status(400).json({ err, error: "Could not save product!!" });

      res.json(product);
    });
  });
};

//read
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//Middleware
//read
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete product" });
    }
    res.json({
      message: "Deletion success",
      deletedProduct,
    });
  });
};

//update
exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) res.status(400).json({ error: "problem with image" });

    //destructure the fields
    const { name, description, price, category, stock } = fields;

    let product = req.product;
    product = _.extend(product, fields);

    //handle fie here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big!!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to db
    product.save((err, product) => {
      if (err)
        res.status(400).json({ err, error: "Could not update product!!" });

      res.json(product);
    });
  });
};
