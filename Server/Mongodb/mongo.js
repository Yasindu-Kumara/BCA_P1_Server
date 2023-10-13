const mongoose = require("mongoose");

const url =
  "mongodb+srv://slyasindu:J8XX0MFlrLDd7zPF@cluster0.gltftqv.mongodb.net/userDB?retryWrites=true&w=majority";

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

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
