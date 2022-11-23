import { useState } from "react";
import "../../assets/css/StyleCuerpo.css"
import { ProductoAdminList } from "./child/productoAdminList.js";
import {srvBck, srvFrt} from "../../constantes.js"


const ListaProductosAdmin = () => {
    let [datosProd, setDatos] = useState("")
    
    const editar = (idProd) => {
        window.location.href= srvFrt + "/modificar_productos/" + idProd
    }
    
    if(datosProd === ""){
        fetch( srvBck + "/productos")
        .then(resp => resp.json())
        .then(datosw => {
            setDatos(datosProd = datosw.map((dato, i) => {
                return <ProductoAdminList key={i} producto={dato} toeditar={editar} />
        }))
        })
    }

    return (
        <div>
            <div>
                <h1 className="text-center">Lista de productos</h1>
            </div>
            <div className="p-3">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col" className="text-center">Miniaura</th>
                        <th scope="col" className="text-center">Nombre</th>
                        <th scope="col" className="text-center">Stock</th>
                        <th scope="col" className="text-center">Precio</th>
                        <th scope="col" className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody><>{datosProd}</></tbody>
                    
                </table>
            </div>
        </div>
    )

}

export {ListaProductosAdmin}