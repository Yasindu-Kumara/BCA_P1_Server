const Express = require("express");
const {collection, stocks, card} = require("./Mongodb/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = Express();
require("dotenv").config();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", cors(), function (req, res) {
  res.send("health check");
});

app.get("/Dashboard", async (req, res) => {
  try {
    const cards = await card.find({});
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/Dashboard/User", async (req, res) => {
  try {
    const users = await collection.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/Dashboard/Item", async (req, res) => {
  try {
    const stock = await stocks.find({});
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
