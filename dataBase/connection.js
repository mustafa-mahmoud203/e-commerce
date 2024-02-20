import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DataBase connected"))
    .catch((err) => console.log(`fail to connect database........ ${err}`));
};
export default connectDB;
