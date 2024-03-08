import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const TipoDocumento = db[0].define(
  "TipoDocumento",
  {
    IdTipoDocumento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    TipoDocumento: {
      type: DataTypes.STRING,
    },
   
    Estado: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default TipoDocumento;
