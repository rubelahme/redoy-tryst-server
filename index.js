const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const uri =
  "mongodb+srv://rubel:I33zEyxzqPkV2bpJ@cluster0.vb3lh.mongodb.net/Redoy?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const collection = client.db("Redoy").collection("Data");

  app.post("/email", (req, res) => {
    const user = req.body;
    collection.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.get("/emails", (req, res) => {
    collection.find().toArray((err, result) => {
      res.send(result);
    });
  });
  app.delete("/delete/:id", (req, res) => {
    collection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);
