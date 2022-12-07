import sequelize from "../../db";

import { DataType } from "sequelize-typescript";

const cloths = sequelize.define(
  "cloth",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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

export default cloths;

//mapping
