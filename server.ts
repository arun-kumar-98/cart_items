import Express from "express";
import { router } from "./src/router/router";
import BodyParser from "body-parser";
import sequelize from "./db";

const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use("/", router);

const port = 4001;

sequelize
  .sync({})
  .then(function () {
    console.log(`database connection established`);
  })
  .catch(function (err) {
    console.log(`failled to db connection`);
  });

function run() {
  try {
    sequelize
      .authenticate()
      .then(() => {
        console.log("database authenticated..");
      })
      .catch(() => {
        console.log("failled ");
      });

    app.listen(port, () => {
      console.log(`server listening at port ${port}`);
    });
  } catch (error) {
    console.log("something went wrong !");
  }
}

run();



//sudo kill -9 `sudo lsof -t -i:4001`