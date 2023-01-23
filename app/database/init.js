import mongoose from "mongoose";
import config from "../config/index.js";

const init = () => {
  mongoose.connect(`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, {});

  mongoose.connection.on("error", () => console.log("Database connection failed."));

  mongoose.connection.once("open", () => console.log("Database connection successful."));
};

export default init;