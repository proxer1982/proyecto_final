import { useState } from "react";
import "../assets/css/listaProdt.css"
import { useCookies } from 'react-cookie';
import {srvBck} from "../constantes.js"

const ListaProductoCliente = ({id}) => {
    let [cuerpo, setCuerpo] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['carrito']);

    function agregarCarrito(evn){
        let id_prod = evn.target.dataset.id_prod
        let max = parseInt(evn.target.dataset.max)

        let carrito = cookies.carrito
        console.log(carrito)
        if(carrito === undefined){
            carrito = []
        }
        let indice = null
        carrito.forEach( (element, ind) => {
            if(element._id === id_prod){
                indice = ind
            }
        });
        if(indice !== null){
            carrito[indice].cantidad += 1
            if(carrito[indice].cantidad > max){
                carrito[indice].cantidad = max
            }
            setCookie("carrito", carrito, { path: '/' })
        } else {
            console.log("no existe producto")
            let pr = {
                _id: id_prod,
                nombre: evn.target.dataset.nombre,
                valor: parseInt(evn.target.dataset.valor),
                cantidad:1,
                imagen:evn.target.dataset.imagen
            }
            carrito.push(pr)

            setCookie("carrito", carrito, { path: '/' })
        }
    }

    fetch(srvBck + "/productos")
    .then(resp => resp.json())
    .then((datos)=>{
        
        setCuerpo(cuerpo = datos.map((prod, ind) => {
            return (
                <div key={ind} className="col-md-6 col-lg-4 col-xl-3 col-12 p-2">
                    <div className="cajaimagen h-100 d-flex flex-column">
                        <div className="imagen text-center">
                            <img src={prod.imagen.url} width="90%" />
                        </div>
                        <div className="flex-grow-1 align-content-around justify-content-center d-flex flex-column descripcion mt-3 p-2">
                            <h4 className="text-center">{prod.nombreProducto}</h4>
                        </div>
                        <div className="d-flex justify-content-between px-4">
                            <div className="precio text-center">$ {prod.precio}</div>
                            <div className="text-center">Stock: {prod.stock}</div>
                        </div>
                        <div className="text-center pb-3 mt-2">
                            <button 
                                className="btn btncarrito w-50"
                                onClick={(e) => agregarCarrito(e, id)}
                                type="button"
                                data-id_prod={prod._id}
                                data-nombre={prod.nombreProducto}
                                data-imagen={prod.imagen.url}
                                data-valor={prod.precio}
                                data-max ={prod.stock}>
                                Agregar a carrito</button>
                        </div>
                    </div>
                </div>
            )
        }) )
    })
   

    return (
        <div>
            <div>
                <h1 className="text-center">Lista de productos</h1>
            </div>
            <div className="p-3">
                <div className="row">
                    {cuerpo}
                </div>
                </div>
        </div>
    )

}

export { ListaProductoCliente }