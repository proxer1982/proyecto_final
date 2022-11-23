import {Router} from "express";
import { obtenerVentas, buscarVentaID, crearVenta, actualizarVenta} from "../controllers/ventasController.js"

const routerVenta = Router()

routerVenta.get("/ventas", obtenerVentas)
routerVenta.get("/ventas/:id", buscarVentaID)
routerVenta.post("/ventas", crearVenta)
routerVenta.put("/ventas/:id",actualizarVenta)

export default routerVenta