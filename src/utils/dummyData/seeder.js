import { readFileSync } from "fs";
import "colors";
import { config } from "dotenv";
import productModel from "../../../dataBase/models/product.model.js";
import connectDB from "../../../dataBase/connection.js";
config({ path: "../../../.env" });


connectDB();


const products = JSON.parse(readFileSync("./products.json"));

const insertData = async () => {
  try {
    await productModel.create(products);
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const destroyData = async () => {
  try {
    await productModel.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "insert") {
  insertData();
} else if (process.argv[2] === "destroy") {
  destroyData();
}
