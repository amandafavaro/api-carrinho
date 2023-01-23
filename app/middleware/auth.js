import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "bson";
import config from "../config/index.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import Token from "../models/token.js";

export const signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(201).send({ message: "New user successful added." });
    return;
  });
};

export const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      res.status(401).send({
        message: "Invalid password.",
      });
    }

    let token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({
      email: user.email,
      accessToken: token,
      role: user.role
    });
  });
};

export const validateHeader = (req, res, next) => {
  let token = req.get('X-token');

  if (!token) {
    return res.status(403).send({ message: "Missing token." });
  }

  Token.findOne({ access_token: token }).exec((err, token) => {
    if (token) {
      res.status(401).send({ message: "Expired token." });
    }
  });

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token." });
    }

    User.findById({ _id: ObjectId(decoded.id)}).exec((err, user) => {
      if (req.url.includes('users') && user.role != 'seller') {
        return res.status(403).send({ message: "Missing permission." });
      }

      next();
    });
  });
};

export const validate = (req, res) => {
  let token = req.body.token;

  if (!token) {
    return res.status(403).send({ message: "Missing token." });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token." });
    }
  });
};

export const logout = (req, res) => {
  let token = req.body.token;

  const tokenDb = new Token({
    access_token: token
  });

  tokenDb.save((err, token) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Logout was successful." });
    return;
  });
}