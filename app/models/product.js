import mongoose from "mongoose";

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: Number
  })
);

export default Product;