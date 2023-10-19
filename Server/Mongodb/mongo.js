const mongoose = require("mongoose");
require('dotenv').config();

const mongodb_api_key = process.env.MONGODB_KEY

const url =
  `mongodb+srv://slyasindu:${mongodb_api_key}@cluster0.gltftqv.mongodb.net/userDB?retryWrites=true&w=majority`;
  
const connectionParams = {
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.info("connected to the db");
  })
  .catch((e) => {
    console.log("error", e);
  });

const newSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    require: true,
  },
  Username: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },Password2: {
    type: String,
    require: true,
  },
});

const stockSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    require: true,
  },
  Manufacturer: {
    type: String,
    require: true,
  },
  Color: {
    type: String,
    require: true,
  },
  Size: {
    type: String,
    require: true,
  },
  QuantityOnStock: {
    type: Number,
    require: true,
  },
});

const cardSchema = new mongoose.Schema({
  totalIncome: {
    type: String,
    require: true,
  },
  totalExpense: {
    type: String,
    require: true,
  },
  totalCredit: {
    type: String,
    require: true,
  },
  totalBonus: {
    type: String,
    require: true,
  },
  totalProduct: {
    type: String,
    require: true,
  },
  totalEarning: {
    type: String,
    require: true,
  },
})

const collection = mongoose.model("collection", newSchema);
const stocks = mongoose.model("stocks",stockSchema);
const card = mongoose.model("card", cardSchema);


module.exports = {collection, stocks, card};
