import { useState } from "react";
import "../../assets/css/modificarProducto.css"
import axios from "axios"
import { useParams } from "react-router-dom";
import {srvBck, srvFrt} from "../../constantes.js"

let productoInc = {}

const ModificarProducto = (props) => {
    
    let { id } = useParams();
    let [nombre, setNombre] = useState(productoInc.nombreProducto)
    let [idP, setId] = useState(productoInc._id)
    let [descrip, setDescrip] = useState(productoInc.descripcion)
    let [precio, setPrecio] = useState(productoInc.precio)
    let [stock, setStock] = useState(productoInc.stock)

    if(id !== undefined && productoInc._id=== undefined){
        fetch( srvBck + '/producto/' + id)
        .then((response) => response.json())
        .then((result) => {
            productoInc = result
            setNombre(productoInc.nombreProducto)
            setId(productoInc._id)
            setDescrip(productoInc.descripcion)
            setPrecio(productoInc.precio)
            setStock(productoInc.stock)
        })
    }

    function guardarPro (evt) {
        evt.preventDefault();

        const idpro = document.getElementById("_id").value
        console.log(idpro)
        
        if(idpro === ""){
            const formData = new FormData();
            const fileField = document.querySelector('input[type="file"]').files[0];
            if(fileField !== undefined){
                formData.append('imagen', fileField);
            }
            
            formData.append('nombreProducto', document.getElementById("nombre_producto").value);
            formData.append('descripcion', document.getElementById("descripcion").value);
            formData.append('precio', document.getElementById("precio").value);
            formData.append('stock', document.getElementById("stock").value);

            axios.post( srvBck + "/productos", formData)
            .then(response => {
                console.log(response)
                window.location.href= srvFrt + "/lista_productos_admin"
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            let prodUpt = {
                _id:idpro,
                nombreProducto: document.getElementById("nombre_producto").value,
                descripcion: document.getElementById("descripcion").value,
                precio:document.getElementById("precio").value,
                stock:document.getElementById("stock").value
            }

            console.log(prodUpt)
            axios.put( srvBck + "/producto/" + idpro, prodUpt)
            .then(response => {
                console.log(response)
                window.location.href= srvFrt + "/lista_productos_admin"
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    return (
        <div className="w-100">
            <div>
                <h1 className="text-center">Producto Nuevo</h1>
            </div>
            <div className="row p-3 mt-5 justify-content-center d-flex">
                <div className="col-10 col-md-6 col-lg-5">
                    <form onSubmit={guardarPro}>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Nombre: </label>
                            <input type="hidden" name="_id" id="_id" value={id} />
                            <input className="form-control" name="nombreProducto" id="nombre_producto" type="text" defaultValue={nombre} required  />
                        </div>
                        <div className="row">
                            <label className="col-sm-12 col-form-label">Descripcion: </label>
                            <textarea className="form-control" name="descripcion" id="descripcion" defaultValue={descrip}  ></textarea>
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Precio: </label>
                            <input className="form-control" name="precio" id="precio" type="number" defaultValue={precio} required  />
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Stock: </label>
                            <input className="form-control" type="number" name="stock" id="stock" required defaultValue={stock}  />
                        </div>
                         { id === undefined ? (
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Imagen: </label>
                            <input className="form-control" name="imagen" type="file" />
                        </div> ) : (<></>)}
                        <div className="row">
                            <button type="submit"  className="btn btn-primary my-5" >Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )

    
}



export { ModificarProducto }