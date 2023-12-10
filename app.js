const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const { sequelize } = require("./db/sequelizeSetup");

app.use(express.json());
app.use(morgan("dev"));

const coworkingRouter = require("./routes/coworkingRoutes");
const userRouter = require("./routes/userRoutes.js");

app.use("/api/coworkings", coworkingRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`L' app d'exemple écoute le port ${port}`);
});
