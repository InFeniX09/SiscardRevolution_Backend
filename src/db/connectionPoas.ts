import { Sequelize } from "sequelize";
export const db1: Sequelize[] = [];
import dotenv from "dotenv";
dotenv.config();

const Poas2000 = new Sequelize(
  process.env.NombreBD2 || "",
  process.env.UsuarioBD2 || "",
  process.env.ClaveBD2 || "",
  {
    dialect: "mssql",
    host: process.env.IpBD2 || "",
    timezone: "",
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

db1.push(Poas2000);

export default Poas2000;

export const connectPoas = async () => {
  // De la base Halcon se consultan los autorizadores
  try {
    await Poas2000.authenticate();
    console.log("Base de datos Poas2000 online");
  } catch (error) {
    console.log("Base de datos Poas2000 offline");
    throw error;
  }
};
