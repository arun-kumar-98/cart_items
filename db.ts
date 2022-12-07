import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("cart", "root", "root@123", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  schema: "cartServices",
});

try {
  sequelize.authenticate();
} catch (error) {
  throw error;
}

export default sequelize;
