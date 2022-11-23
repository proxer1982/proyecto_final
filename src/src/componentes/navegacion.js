import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./login.js"
import { RegistrarUsuario} from "./registrarUsuario.js"

import { DashBoard } from "./admin/dashBoard.js"
import { ListaProductosAdmin } from "./admin/listaProductosAdmin.js"
import { ModificarProducto } from "./admin/modificarProducto.js"
import { ListaVentas } from "./admin/listaVentas.js"
import { ListaUsuariosAdmin } from "./admin/listaUsuariosAdmin.js"
import { CearUsuario } from "./admin/crearUsuario.js"
import { EditarUsuario } from "./admin/editarUsuario.js"

import { ListaProductoCliente } from "./listaProductosClientes.js"
import { ListaCarrito } from "./listaCarritoClientes.js"


export const Navegacion = ({ rol, id_user }) => {
  return (
    <section className="w-100">
      <div className="container">
        <div className="row p-5"></div>
        <Routes>
          {rol === "admin" || rol === "user" ? (
            <Fragment>
              {rol === "admin" ? (
              <>
              <Route path="/" element={<DashBoard />} />
              <Route path="/lista_productos_admin" element={<ListaProductosAdmin />} />
              <Route path="/crear_productos" element={<ModificarProducto />} />
              <Route path="/modificar_productos/:id" element={<ModificarProducto id={Route.id} />} />
              <Route path="/lista_ventas" element={<ListaVentas />} />
              <Route path="/lista_usuarios" element={<ListaUsuariosAdmin />} />
              <Route path="/crear_usuario" element={<CearUsuario />} />
              <Route path="/editar_usuario/:id" element={<EditarUsuario />} />
              </>
              ) : (
              <>
                <Route path="/" element={<ListaProductoCliente id={id_user} />} />
                <Route path="/carrito" element={<ListaCarrito id={id_user} />}  />
              </>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/" element={< Login />} />
              <Route path="/registrar" element={< RegistrarUsuario />} />
            </Fragment>
          )}
        </Routes>
      </div>
    </section>
  );
};