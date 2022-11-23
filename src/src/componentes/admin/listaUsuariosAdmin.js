import { useState } from "react";
import "../../assets/css/StyleCuerpo.css"
import { faTrashAlt, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {srvBck, srvFrt} from "../../constantes.js"


export const ListaUsuariosAdmin = () => {
    let [datosUsuarios, setDatosUsuarios] = useState([])

    fetch( srvBck + "/usuarios")
    .then(resp => resp.json())
    .then(datosw => {
        setDatosUsuarios(datosw) 
    })


    let editarU = (idUser) => {
        window.location.href= srvFrt + "/editar_usuario/" + idUser
    }

    let eliminarU = (id) => {
        if(window.confirm("¿Esta seguro de eliminar este usuario?")){
            fetch(srvBck + "/usuario/" + id, { method: 'DELETE' } )
            .then(resp => {
                console.log(resp)
                window.location.href= srvFrt + "/lista_productos_admin"
            })
        }
    }

    return (
        <div>
            <div>
                <h1 className="text-center">Lista de Usuarios</h1>
            </div>
            <div className="p-3">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col" className="text-center">Nombre</th>
                        <th scope="col" className="text-center">Email</th>
                        <th scope="col" className="text-center">Rol</th>
                        </tr>
                    </thead>
                    <tbody>{datosUsuarios.map((elemento, ind) => {
                        return (
                            <tr key={ind}>
                                <td><b>{elemento.nombre}</b> <small><i>({elemento._id})</i></small></td>
                                <td className="text-center">{elemento.email}</td>
                                <td className="text-center">{elemento.rol}</td>
                                <td>
                                    <button className="btn btn-dark text-light" onClick={() => editarU(elemento._id)}>
                                        <FontAwesomeIcon icon={faUserPen} />
                                    </button>
                                    <button className="btn  btn-danger text-light ms-2" onClick={() => eliminarU(elemento._id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                        
                    )}</tbody>
                    
                </table>
            </div>
        </div>
    )

}