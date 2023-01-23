import { ObjectId } from "bson";
import Product from "../models/product.js";

export const addProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(201).send({ message: "New product successful added." });
    return;
  });
}

export const listProducts = (req, res) => {
  Product.find({}, "_id name price").exec((err, products) => {
    res.status(200).send(products);
  });
};

export const returnProduct = (req, res) => {
  Product.findOne({ _id: ObjectId(req.params.id) }, "_id name price").exec((err, product) => {
    res.status(200).send(product);
  });
};

export const updateProduct = (req, res) => {
  Product.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body).exec(
    (err, product) => {
      res.status(200).send(product);
    }
  );
};

export const removeProduct = (req, res) => {
  Product.remove({ _id: ObjectId(req.params.id) }).exec((err, product) => {
    res.status(200).send(product);
  });
};

export const searchProductByName = (req, res) => {
  Product.find({ name: { $regex: req.query.name }}, "_id name price").exec((err, products) => {
    res.status(200).send(products);
  });
};