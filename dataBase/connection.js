

import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/E-commerce")
    .then(() => console.log("DataBase connected"))
    .catch((err) => console.log(`fail to connect database........ ${err}`));
};
export default connectDB;