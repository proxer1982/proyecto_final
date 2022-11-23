import ex, { application } from "express"
import productoRoutes from "./routes/productos_routes.js"
import fileUpload from "express-fileupload";
import routerVenta from "./routes/ventas_routers.js";
import routerUsuario from "./routes/usuario_routes.js";
import cors from "cors"

const app = ex()
//midelware
app.use(ex.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "./files"

}))


app.use(cors())

//Routes
app.use(productoRoutes)
app.use(routerVenta)
app.use(routerUsuario)
app.use(ex.static("./src/build"))

export default app