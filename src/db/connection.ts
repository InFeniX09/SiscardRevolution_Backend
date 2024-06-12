import { Sequelize } from "sequelize";
export const db: Sequelize[] = [];
import dotenv from "dotenv";
dotenv.config();

const SiscardRevolution = new Sequelize(
  process.env.NombreBD1 || "",
  process.env.UsuarioBD1 || "",
  process.env.ClaveBD1 || "",

  {
    dialect: "mssql",
    host: process.env.IpBD1 || "",
    port: 1433,
    dialectOptions: {},
  }
);

db.push(SiscardRevolution);

export default SiscardRevolution;

export const connect = async () => {
  // De la base Halcon se consultan los autorizadores
  try {
    await SiscardRevolution.authenticate();
    console.log("Base de datos SiscardRevolution online");
  } catch (error) {
    console.log('yara',process.env.NombreBD1)
    console.log('yara',process.env.UsuarioBD1)
    console.log('yara',process.env.ClaveBD1)
    console.log('yara',process.env.IpBD1)

    console.log("Base de datos SiscardRevolution offline");
    throw error;
  }
};
