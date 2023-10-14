const Express = require("express");
const collection = require("./Mongodb/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = Express();
require('dotenv').config();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT

app.get("/", cors(), function (req, res) {});

app.post("/Signin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const check = await collection.findOne({ Email: Email });

    if (!check) {
      res.json("notexist");
      return;
    }

    const isValidPassword = await bcrypt.compare(Password, check.Password);

    if (isValidPassword) {
      res.json("exist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

app.post("/", async (req, res) => {
  const { Fullname, Username, Email, Password } = req.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const passwordHash = await bcrypt.hash(Password, salt);

  const data = {
    Fullname: Fullname,
    Username: Username,
    Email: Email,
    Password: passwordHash,
  };

  try {
    const check = await collection.findOne({ Email: Email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(port, () => {
  console.log("server is start prot 8000");
});
