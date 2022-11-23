import { useState } from "react";
import "../../assets/css/modificarProducto.css"
import { useParams } from "react-router-dom";
import {srvBck, srvFrt} from "../../constantes.js"

let usuario = {};

const EditarUsuario = () => {
    

    let { id } = useParams();
    let [nombre, setNombre] = useState(usuario.nombre)
    let [idU, setId] = useState(usuario._id)
    let [roleU, setRole] = useState(usuario.rol)
    let [email, setEmail] = useState(usuario.email)
    let [password, setPass] = useState(usuario.possword)


    if(id !== undefined && usuario._id=== undefined){
        fetch( srvBck + '/usuario/' + id)
        .then((response) => response.json())
        .then((result) => {
            usuario = result
            setNombre(usuario.nombre)
            setId(usuario._id)
            setRole(usuario.rol)
            setEmail(usuario.email)
            setPass(usuario.password)
        })
    }


    const guardar =  async () => {
        
        
        usuario.nombre = document.getElementById("nombre_usuario").value
        let pass = document.getElementById("newpassword").value
        console.log("pasword: " + pass)
        if(pass != ""){
            console.log("cambiar")
            usuario.newpassword =  pass
        }
        
        usuario.rol =  document.getElementById("role").value
        
        console.log(usuario.rol)
        fetch( srvBck + '/usuario/' + id, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(usuario)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            window.location.href= srvFrt + "/lista_usuarios"
        })
        .catch((error) => {
            console.error('Error:', error);
        })

    }

    const cambio = (e) => {
        setRole(e.target.value)
    }

    return (
        <div className="w-100">
            <div>
                <h1 className="text-center">Editar Usuario</h1>
            </div>
            <div className="row p-3 mt-5 justify-content-center d-flex">
                <div className="col-10 col-md-6 col-lg-5">
                    <form>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Nombre: </label>
                            <input className="form-control" name="nombreUsuario" id="nombre_usuario" type="text" defaultValue={nombre} required  />
                        </div>
                        <div className="row">
                            <label className="col-sm-12 col-form-label">Email: </label>
                            <input className="form-control" type="email" name="email" id="email" value={email} disabled required />
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >Password: </label>
                            <input className="form-control" name="newpassword" id="newpassword" type="password" />
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label" >rol: </label>
                            <select className="form-control" name="role" id="role" onChange={e => cambio(e)} defaultChecked={roleU} value={roleU}  defaultValue={roleU} >
                                <option value="user">Cliente</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-primary my-5" onClick={() => guardar()} >Guardar</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )

    
}



export { EditarUsuario }