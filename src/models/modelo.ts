import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Modelo = db[0].define(
  "Modelo",
  {
    IdModelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Modelo: {
      type: DataTypes.STRING,
    },
    idMarca: {
      type: DataTypes.INTEGER,
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

export default Modelo;
