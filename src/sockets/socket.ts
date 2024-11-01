import { Server as SocketIOServer } from "socket.io";
import {
  crearMensajeSocket,
  generarExcelReporte,
  listarMenuxUsuarioxPerfil,
  listarReporte,
  listarUsuarioSocket,
  listarchatSocket,
} from "../controllers/Extra/chat";
import {
  armarPdfSolicitudSocket,
  crearSolicitudSocket,
  crearTicketSocket,
  listarAccesorioxClxTexUsuSocket,
  listarArea,
  listarEquipoxClxTexUsuSocket,
  listarPuesto,
  listarSolicitud,
  listarSolicitudXId,
  listarTicketSocket,
  listarTipoDocumento,
  listarTipoMotivoSocket,
  listarTipoSolicitudSocket,
} from "../controllers/Soporte/centro-atencion";
import {
  crearEquipoDescuentoSocket,
  crearEquipoSocket,
  crearEquipoStockSocket,
  crearMarcaSocket,
  crearModeloSocket,
  crearTipoEquipoSocket,
  listarClasificacionEquipoSocket,
  listarEquipoDescuentoSocket,
  listarEquipoSocket,
  listarEquipoXAreaXClienteXTipoEquipo,
  listarEquipoxClxTCSocket,
  listarMarcaSocket,
  listarMarcaXTipoEquipo,
  listarMarcaxTipoEquipo,
  listarModeloSocket,
  listarModeloXMarca,
  listarTipoEquipoSocket,
  listarTipoEquipoxClSocket
} from "../controllers/Logistica/gestion-equipo";
import {
  cargaMasivaEquipoSocket,
  listarEquipoControlSocket,
  listarEquipoSerieSocket,
  listarEquipoSerieXIdEquipoStock,
  listarEquipoStockSocket,
  listarEquipoxClasificacionSocket,
} from "../controllers/Logistica/gestion-stock";
import {
  crearUsuario,
  listarClienteSocket,
} from "../controllers/Sistemas/gestion-entidad";
import { cambioClave, enviarCorreoSocket, recuperarClave, recuperarClaveToken } from "../controllers/Auth/auth";
import { crearEmpleado, listarDepartamento, listarDistritoXProvinciaXDepartamento, listarProvinciaXDepartamento, listarTablaEmpleado } from "../controllers/RecursosHumanos/configuraciones";
import { listarEmpleadoSinUsuario, listarTablaMenuAsignado } from "../controllers/Sistemas/configuraciones";

class Sockets {
  private io: SocketIOServer;
  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log(`${socket.id} connected.`);
      /*----------------------------
      --#Módulo Autorización
      ----------------------------*/
      socket.on("enviarcorreo", async (data, callback) => {
        const json = await enviarCorreoSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("recuperar-clave", async (data, callback) => {
        const json = await recuperarClave(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("recuperacion-clavetoken", async (data, callback) => {
        const json = await recuperarClaveToken(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("cambio-clave", async (data, callback) => {
        const json = await cambioClave(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-menuxusuarioxperfil", async (data, callback) => {
        const json = await listarMenuxUsuarioxPerfil(data);
        console.log("json", json);
        callback(json);
      });
      /*----------------------------
      --#Módulo Recursos Humanos
      ----------------------------*/
      socket.on("listar-tipodocumento", async (data, callback) => {
        const json = await listarTipoDocumento();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-area", async (data, callback) => {
        const json = await listarArea();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-puesto", async (data, callback) => {
        const json = await listarPuesto(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-tablaempleado", async (data, callback) => {
        const json = await listarTablaEmpleado();
        callback(json);
      });
      socket.on("crear-empleado", async (data, callback) => {
        const json = await crearEmpleado(data);
        callback(json);
      });
      socket.on("listar-departamento", async (data, callback) => {
        const json = await listarDepartamento();
        callback(json);
      });
      socket.on("listar-provinciaxdepartamento", async (data, callback) => {
        const json = await listarProvinciaXDepartamento(data);
        callback(json);
      });
      socket.on("listar-distritoxprovinciaxdepartamento", async (data, callback) => {
        const json = await listarDistritoXProvinciaXDepartamento(data);
        callback(json);
      });
      /*----------------------------
      --#Módulo Sistemas
      ----------------------------*/
      socket.on("listar-usuario", async (data, callback) => {
        const dom = await listarUsuarioSocket(data);
        callback(dom);
      });
      socket.on("listar-cliente", async (data, callback) => {
        const json = await listarClienteSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("crear-usuario", async (data, callback) => {
        const json = await crearUsuario(data);
        callback(json);
      });
      socket.on("listar-tablamenuasignado", async (data, callback) => {
        const dom = await listarTablaMenuAsignado();
        callback(dom);
      });
      socket.on("listar-empleadosinusuario", async (data, callback) => {
        const dom = await listarEmpleadoSinUsuario();
        console.log('urr',dom)
        callback(dom);
      });
      /*----------------------------
      --#Módulo Logística
      ----------------------------*/
      socket.on("listar-clasificacionequipo", async (data, callback) => {
        const json = await listarClasificacionEquipoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-tipoequipo", async (data, callback) => {
        const json = await listarTipoEquipoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-tipoequipoxcl", async (data, callback) => {
        const json = await listarTipoEquipoxClSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-marca", async (data, callback) => {
        const json = await listarMarcaSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-modelo", async (data, callback) => {
        const json = await listarModeloSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipo", async (data, callback) => {
        const json = await listarEquipoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("crear-tipoequipo", async (data, callback) => {
        const json = await crearTipoEquipoSocket(data);
        callback(json);
      });
      socket.on("crear-marca", async (data, callback) => {
        const json = await crearMarcaSocket(data);
        callback(json);
      });
      socket.on("crear-modelo", async (data, callback) => {
        const json = await crearModeloSocket(data);
        callback(json);
      });
      socket.on("crear-equipo", async (data, callback) => {
        const json = await crearEquipoSocket(data);
        callback(json);
      });
      socket.on("crear-equipodescuento", async (data, callback) => {
        const json = await crearEquipoDescuentoSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("ingresar-stock", async (data, callback) => {
        const json = await crearEquipoStockSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipostock", async (data, callback) => {
        const json = await listarEquipoStockSocket();
        callback(json);
      });
      socket.on("listar-equiposeriexidequipostock", async (data, callback) => {
        const json = await listarEquipoSerieXIdEquipoStock(data);
        callback(json);
      });
      socket.on("listar-equipocontrol", async (data, callback) => {
        const json = await listarEquipoControlSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipodescuento", async (data, callback) => {
        const json = await listarEquipoDescuentoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equiposerie", async (data, callback) => {
        const json = await listarEquipoSerieSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("cargamasiva-equipo", async (data, callback) => {
        const json = await cargaMasivaEquipoSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipoxclasificacion", async (data, callback) => {
        const json = await listarEquipoxClasificacionSocket();
        console.log("json", json);
        callback(json);
      });

      socket.on("listar-MarcaxTipoEquipo", async (data, callback) => {
        const json = await listarMarcaxTipoEquipo();
        console.log("json", json);
        callback(json);
      });

      socket.on("listar-marcaxtipoequipo", async (data, callback) => {
        const json = await listarMarcaXTipoEquipo(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-modeloxmarca", async (data, callback) => {
        const json = await listarModeloXMarca(data);
        console.log("json", json);
        callback(json);
      });
      socket.on(
        "listar-equipoxareaxclientextipoequipo",
        async (data, callback) => {
          const json = await listarEquipoXAreaXClienteXTipoEquipo(data);
          console.log("json", json);
          callback(json);
        }
      );
      socket.on("listar-equipoxclxtc", async (data, callback) => {
        const json = await listarEquipoxClxTCSocket(data);
        console.log("json", json);
        callback(json);
      });
      /*----------------------------
      --#Módulo Operaciones
      ----------------------------*/
      /*----------------------------
      --#Módulo Soporte
      ----------------------------*/
      socket.on("listar-solicitudxid", async (data, callback) => {
        const json = await listarSolicitudXId(data);
        console.log(json)
        callback(json);
      });
      socket.on("armarpdf-solicitud", async (data, callback) => {
        const json = await armarPdfSolicitudSocket(data);
        callback(json);
      });
      socket.on("listar-tiposolicitud", async (data, callback) => {
        const json = await listarTipoSolicitudSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-tipomotivo", async (data, callback) => {
        const json = await listarTipoMotivoSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-misolicitud", async (data, callback) => {
        const json = await listarSolicitud(data);
        callback(json);
      });
      socket.on("listar-miticket", async (data, callback) => {
        const json = await listarTicketSocket(data);
        callback(json);
      });
      socket.on("listar-solicitud", async (data, callback) => {
        const json = await listarSolicitud(data);
        callback(json);
      });
      socket.on("listar-ticket", async (data, callback) => {
        const json = await listarTicketSocket(data);
        callback(json);
      });
      socket.on("crear-solicitud", async (data, callback) => {
        const json = await crearSolicitudSocket(data);
        callback(json);
      });
      socket.on("crear-ticket", async (data, callback) => {
        const data1 = await crearTicketSocket(data);
        const data2 = await listarTicketSocket(data);
        this.io.emit("listar-ticket", data2);
      });
      /*----------------------------
      --#Módulo Extras
      ----------------------------*/
      socket.on("listar-chat", async (data, callback) => {
        console.log("entraste:", data.DeUsuario_id);
        socket.join(data.DeUsuario_id);
        const chat = await listarchatSocket(data);
        callback(chat);
      });
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await crearMensajeSocket(payload);
        const chat = await listarchatSocket(payload);
        this.io.to(payload.ParaUsuario_id).emit("mensaje-personal", chat);
        this.io.to(payload.DeUsuario_id).emit("mensaje-personal", chat);
      });
      socket.on("listar-reporte", async (data, callback) => {
        const json = await listarReporte();
        console.log("json", json);
        callback(json);
      });
      socket.on("generar-excelreporte", async (data, callback) => {
        const json = await generarExcelReporte(data);
        console.log("json", json);
        callback(json);
      });    
      socket.on("listar-accesorioxclxtexusu", async (data, callback) => {
        const json = await listarAccesorioxClxTexUsuSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipoxclxtexusu", async (data, callback) => {
        const json = await listarEquipoxClxTexUsuSocket(data);
        console.log("json", json);
        callback(json);
      });
    
    });
  }
}

export default Sockets;
