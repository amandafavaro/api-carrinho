import { ObjectId } from "bson";
import User from "../models/user.js";

export const listUsers = (req, res) => {
  User.find({}, "_id name email role").exec((err, users) => {
    res.status(200).send(users);
  });
};

export const returnUser = (req, res) => {
  User.findOne({ _id: ObjectId(req.params.id) }, "_id name email role").exec((err, user) => {
    res.status(200).send(user);
  });
};

export const returnRole = (req, res) => {
  User.findOne({ _id: ObjectId(req.params.id) }, "_id name email role").exec((err, user) => {
    res.status(200).send(user.role);
  });
}

export const updateUser = (req, res) => {
  User.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body).exec(
    (err, user) => {
      res.status(200).send(user);
    }
  );
};

export const removeUser = (req, res) => {
  User.remove({ _id: ObjectId(req.params.id) }).exec((err, user) => {
    res.status(200).send(user);
  });
};

export const searchUserByName = (req, res) => {
  User.find({ name: { $regex: req.query.name }}, "_id name email role").exec((err, users) => {
    res.status(200).send(users);
  });
}