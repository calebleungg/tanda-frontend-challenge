const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./router/auth");
const organisationsRouter = require("./router/organisations");
const shiftsRouter = require("./router/shifts");
const usersRouter = require("./router/users");
const cors = require("cors")
const app = express();
app.use(cors({
  credentials: true,
  origin: (host, cb) => {
      cb(null, true)
  }
}))

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/organisations", organisationsRouter);
app.use("/shifts", shiftsRouter);
app.use("/users", usersRouter);

app.listen(3005, () => {
  console.log("Server running on port 3005");
});
