"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarDistritoXProvinciaXDepartamento = exports.listarProvinciaXDepartamento = exports.listarDepartamento = exports.crearEmpleado = exports.listarTablaEmpleado = void 0;
const departamento_1 = __importDefault(require("../../models/departamento"));
const distrito_1 = __importDefault(require("../../models/distrito"));
const empleado_1 = __importDefault(require("../../models/empleado"));
const entidad_1 = __importDefault(require("../../models/entidad"));
const provincia_1 = __importDefault(require("../../models/provincia"));
const listarTablaEmpleado = () => __awaiter(void 0, void 0, void 0, function* () {
    entidad_1.default.belongsTo(empleado_1.default, { foreignKey: "EntidadRelacion_id" });
    const results = yield entidad_1.default.findAll({
        raw: true,
        attributes: ["Empleado.IdEmpleado", "Empleado.Correo", "Empleado.Telefono"],
        include: [
            {
                model: empleado_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {},
    });
    return results;
});
exports.listarTablaEmpleado = listarTablaEmpleado;
const crearEmpleado = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield empleado_1.default.findOne({
        where: {
            Correo: data.CorreoCorporativo,
        },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query2 = yield entidad_1.default.create({
            Nombres: data.Nombres,
            Apellidos: data.Apellidos,
            TipoDocumento_id: data.TipoDocumento,
            NroDocumento: data.NroDocumento,
            Correo: data.Correo,
            Telefono: data.Telefono,
            Ubigeo: data.Ubigeo,
            Direccion: data.Direccion,
            EntidadRelacion_id: data.EntidadRelacion,
            Genero: data.Genero,
            FcNacimiento: data.Fecha,
            FcIngreso: data.FechaIngreso,
            TipoEntidad_id: 1,
        });
        const Query3 = yield empleado_1.default.create({
            Area_id: data.Area,
            Puesto_id: data.Puesto,
            Correo: data.CorreoCorporativo,
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearEmpleado = crearEmpleado;
const listarDepartamento = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield departamento_1.default.findAll({
        raw: true,
        attributes: ["IdDepartamento", "Departamento"],
        where: {},
    });
    return results;
});
exports.listarDepartamento = listarDepartamento;
const listarProvinciaXDepartamento = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield provincia_1.default.findAll({
        raw: true,
        attributes: ["IdProvincia", "Provincia"],
        where: {
            Departamento_id: data.Departamento,
        },
    });
    return results;
});
exports.listarProvinciaXDepartamento = listarProvinciaXDepartamento;
const listarDistritoXProvinciaXDepartamento = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield distrito_1.default.findAll({
        raw: true,
        attributes: ["IdDistrito", "Distrito"],
        where: {
            Provincia_id: data.Provincia,
        },
    });
    return results;
});
exports.listarDistritoXProvinciaXDepartamento = listarDistritoXProvinciaXDepartamento;
