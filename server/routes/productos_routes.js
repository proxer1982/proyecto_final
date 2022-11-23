import {Router} from "express"
import {obtenerProductos, crearProductos, actualizarProductos, eliminarProductos, buscarProductosID} from "../controllers/productosController.js"
import path from "path"

let dirFront = path.join(path.resolve(), "src")
const router = Router()

router.get("/", (req, resp) => {
    resp.sendFile(dirFront + "/build/index.html")
})

router.get("/lista_productos_admin", (req, resp) => {
    resp.sendFile(dirFront + "/build/index.html")
})

router.get("/lista_usuarios", (req, resp) => {
    resp.sendFile(dirFront + "/build/index.html")
})

router.get("/editar_usuario/:id", (req, resp) => {
    resp.sendFile(dirFront + "/build/index.html")
})

router.get("/carrito", (req, resp) => {
    resp.sendFile(dirFront + "/build/index.html")
})



router.get("/productos", obtenerProductos)
router.post("/productos", crearProductos)
router.put("/producto/:id", actualizarProductos) //636c66596c273d9b46b3daa2
router.delete("/producto/:id", eliminarProductos)

router.get("/producto/:id", buscarProductosID)

export default router