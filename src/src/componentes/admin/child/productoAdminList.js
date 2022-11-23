import { faTrashAlt, faFileEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { srvBck, srvFrt } from '../../../constantes.js'

function ProductoAdminList (props) {
    let id = props.producto._id

    const eliminarP = () => {
        if(window.confirm("¿Esta seguro de eliminar este producto?")){
            fetch(srvBck + "/producto/" + id, { method: 'DELETE' } )
            .then(resp => {
                console.log(resp)
                window.location.href= srvFrt + "/lista_productos_admin"
            })
        }
        
    }


    return (
        <tr>
            <td>
                <img src={props.producto.imagen.url} width={60} />
            </td>
            <td>{props.producto.nombreProducto}</td>
            <td className="casillaCantidad text-center">{props.producto.stock}</td>
            <td className="text-end">$ {props.producto.precio}</td>
            <td className="text-center">
                 <button className="btn btn-dark text-light" onClick={() => {props.toeditar(props.producto._id)}}>
                    <FontAwesomeIcon icon={faFileEdit} />
                </button>
                 <button className="btn  btn-danger text-light ms-2" onClick={eliminarP}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}

export {ProductoAdminList}