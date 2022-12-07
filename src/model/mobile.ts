import sequelize from "../../db";

import { DataType } from "sequelize-typescript";
const mobile = sequelize.define(
  "mobile",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default mobile;
