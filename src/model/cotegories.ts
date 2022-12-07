import { DataType } from "sequelize-typescript";
import sequelize from "../../db";
import cloths from "./cloth";
import mobile from "./mobile";

const cotegories = sequelize.define(
  "cotegories",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    tableName: "cotegories",
    freezeTableName: true,
    timestamps: false,
  }
);

//mapping

cotegories.hasMany(mobile, {
  foreignKey: "c_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
mobile.belongsTo(cotegories, { foreignKey: "c_id" });

cotegories.hasMany(cloths, {
  foreignKey: "c_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
cloths.belongsTo(cotegories, { foreignKey: "c_id" });

export default cotegories;

//ts-node ./node_modules/sequelize-auto-migrations/bin/makemigration --name migration/migration.ts
