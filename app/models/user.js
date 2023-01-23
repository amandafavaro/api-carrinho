import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String
  })
);

export default User;