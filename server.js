const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);
//middleware
//to be able to access the req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
