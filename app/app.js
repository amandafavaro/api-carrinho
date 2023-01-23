import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import init from "./database/init.js";
import { signup, login, logout, validate, validateHeader } from "./middleware/auth.js";
import { listUsers, returnUser, updateUser, removeUser, searchUserByName, returnRole } from "./middleware/users.js";
import { addProduct, listProducts, returnProduct, updateProduct, removeProduct, searchProductByName } from "./middleware/products.js";

mongoose.Promise = global.Promise;

const app = express();

const PORT = 5000;

init();

const corsOptions = { origin: "http://localhost:4200" };

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log("Database online."));

// Users
app.post("/signup", signup);

app.get("/users/:id", validateHeader, returnUser);
app.get("/users/:id", validateHeader, returnRole);
app.get("/users", validateHeader, listUsers);

app.put("/users/:id", validateHeader, updateUser);
app.delete("/users/:id", validateHeader, removeUser);

app.get("/searchUser", validateHeader, searchUserByName);

// Products
app.post("/products", validateHeader, addProduct);

app.get("/products/:id", validateHeader, returnProduct);
app.get("/products", validateHeader, listProducts);

app.put("/products/:id", validateHeader, updateProduct);
app.delete("/products/:id", validateHeader, removeProduct);

app.get("/searchProduct", validateHeader, searchProductByName);

// Validations
app.post("/login", login);
app.post("/validate", validate);
app.post("/logout", logout);