require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const app = express();

const port = process.env.PORT || 4000;

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.2dp5m.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const mongodbStore = new MongoDBStore({
  uri: MONGODB_URI,
  collections: process.env.SESSION_COLLECTION,
});

// All Routes
const userRoutes = require("./routes/user");
const queryRoutes = require("./routes/query");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    store: mongodbStore,
    cookie: {
      maxAge: Number(process.env.MAX_AGE),
      sameSite: false,
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/query", queryRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data,
  });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
