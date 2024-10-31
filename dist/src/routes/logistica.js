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
const pdfkit_1 = __importDefault(require("pdfkit"));
const express_1 = require("express");
const guia_remision_1 = require("../controllers/Logistica/guia-remision");
const reporte_sga_1 = require("../controllers/Logistica/reporte-sga");
const Reporte_logistica_claro_1 = __importDefault(require("../models/DWH/views/Reporte_logistica_claro"));
const sequelize_1 = require("sequelize");
const express = require("express");
const ExcelJS = require("exceljs");
const router = (0, express_1.Router)();
router.get("/listarAlmacenxAlbaranSalida", guia_remision_1.listarAlmacenxAlbaranSalida);
router.get("/listarAlbaranes", guia_remision_1.listarAlbaranes);
router.post("/listarDetalleAlbaranSalida", guia_remision_1.listarDetalleAlbaranSalida);
router.post("/listarDatosPdfAlbaranSalida", guia_remision_1.listarDatosPdfAlbaranSalida);
router.post("/listarAlbaranSalidaxZona", guia_remision_1.listarAlbaranSalidaxZona);
router.get("/descargarReporteSGA", reporte_sga_1.descargarReporteSGA);
router.get("/descargarExcelSGA", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultados = yield Reporte_logistica_claro_1.default.findAll({
            // Puedes agregar filtros si es necesario
            where: {
                Componente_SAP: {
                    [sequelize_1.Op.notIn]: ["1002950", "1053621", "4068259"]
                },
            }
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte");
        worksheet.columns = [
            { header: "CODIGO_SAP", key: "cod_sap", width: 15 },
            { header: "SERIE", key: "serie", width: 10 },
            { header: "CM_MTA_MAC", key: "cm", width: 20 },
            { header: "EMTA_MTA_MAC", key: "emta", width: 10 },
            { header: "UNIT_ADDRESS", key: "unit", width: 15 },
            { header: "DNI", key: "dni", width: 20 },
            { header: "Nombres", key: "nombres", width: 20 },
        ];
        resultados.forEach((resultado) => {
            worksheet.addRow({
                cod_sap: resultado.Componente_SAP,
                serie: resultado.No_Serie,
                cm: resultado.CM_MTA_MAC,
                emta: resultado.EMTA_MTA_MAC,
                unit: resultado.UNIT_ADDRESS,
                dni: resultado.sDsNIF,
                nombres: resultado.sDsZona
            });
        });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", 'attachment; filename="datos.xlsx"');
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        res.status(500).send("Error al generar el archivo Excel");
    }
}));
// Ruta para generar el PDF
// Ruta para generar el PDF
router.post("/generar-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pdatos, pdetalle } = req.body;
        // Generar el PDF
        const pdfBytes = yield generarPDF(pdatos, pdetalle);
        // Configurar encabezados de la respuesta
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=archivo.pdf");
        // Enviar el PDF como respuesta
        res.send(pdfBytes);
        console.log("PDF generado y enviado correctamente");
    }
    catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).send("Error interno del servidor");
    }
}));
// Función para generar el PDF
function generarPDF(pdatos, pdetalle) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const doc = new pdfkit_1.default();
                const buffers = [];
                let currentPage = 1;
                doc.on("data", (buffer) => buffers.push(buffer));
                doc.on("end", () => {
                    const pdfBytes = Buffer.concat(buffers);
                    // Resolvemos la promesa con los bytes del PDF
                    resolve(pdfBytes);
                });
                const datos = pdatos[0];
                const detalle = pdetalle;
                const today = new Date();
                const year = today.getFullYear();
                const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan desde 0
                const day = today.getDate().toString().padStart(2, "0");
                const formattedDate = `${day}/${month}/${year}`;
                for (let i = 0; i < detalle.length; i++) {
                    const currentDetail = detalle[i];
                    let yPosition = 290 + 15 * i;
                    if (i === 17) {
                        // Si llegamos al límite de la primera página, creamos una nueva página
                        doc.addPage();
                        currentPage = 2; // Actualizamos la página actual
                        doc.fontSize(12).text(formattedDate, 113, 115);
                        doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 122, 130);
                        doc.fontSize(10).text(datos.sDsDireccion, 125, 148);
                        doc.fontSize(12).text(datos.sDsCliente, 146, 163);
                        doc.fontSize(12).text(datos.sDsNif, 75, 177);
                        doc.fontSize(12).text(datos.sDsZona, 152, 210);
                        doc.fontSize(12).text(datos.sDsNIF, 79, 224);
                        doc.fontSize(12).text("X", 565, 242);
                    }
                    if (i === 0) {
                        doc.fontSize(12).text(formattedDate, 113, 115);
                        doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 122, 130);
                        doc.fontSize(10).text(datos.sDsDireccion, 125, 148);
                        doc.fontSize(12).text(datos.sDsCliente, 146, 163);
                        doc.fontSize(12).text(datos.sDsNif, 75, 177);
                        doc.fontSize(12).text(datos.sDsZona, 152, 210);
                        doc.fontSize(12).text(datos.sDsNIF, 79, 224);
                        doc.fontSize(12).text("X", 565, 242);
                    }
                    if (currentPage === 1) {
                        // Agregar a la primera página
                        doc.fontSize(12).text(currentDetail.nComponentes, 58, yPosition);
                        doc
                            .fontSize(12)
                            .text(currentDetail.sNmSerie !== ""
                            ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                            : currentDetail.sDsComponente, 98, yPosition);
                    }
                    else {
                        // Agregar a la segunda página
                        yPosition = 15 * i;
                        console.log(yPosition);
                        doc.fontSize(12).text(currentDetail.nComponentes, 58, yPosition);
                        doc
                            .fontSize(12)
                            .text(currentDetail.sNmSerie !== ""
                            ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                            : currentDetail.sDsComponente, 98, yPosition);
                    }
                }
                doc.end();
            }
            catch (error) {
                console.error("Error al generar el PDF:", error);
                reject(error);
            }
        });
    });
}
exports.default = router;
