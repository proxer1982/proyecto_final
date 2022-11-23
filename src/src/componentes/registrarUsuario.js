import {srvBck, srvFrt} from "../constantes.js"

const RegistrarUsuario = () => {

    const guardar =  async () => {
        const usuario = {};
        
        usuario.nombre = document.getElementById("nombre_usuario").value
        usuario.email = document.getElementById("email").value
        usuario.tempassword =  document.getElementById("pass").value
        usuario.rol =  "user"
        
        console.log(usuario.rol)
        fetch(srvBck + '/usuarios', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(usuario)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            window.location.href= srvFrt + "/"
        })
        .catch((error) => {
            console.error('Error:', error);
        })

    }

    return (
        <div className="w-100">
            <div>
                <h1 className="text-center text-light">Usuario Nuevo</h1>
            </div>
            <div className="row p-3 mt-5 justify-content-center d-flex">
                <div><h1>Registarse</h1></div>
                <div className="col-10 col-md-6 col-lg-5">
                    <form>
                        <div className="row">
                            <label className="col-sm-2 col-form-label text-light" >Nombre: </label>
                            <input className="form-control" name="nombreUsuario" id="nombre_usuario" type="text" required  />
                        </div>
                        <div className="row">
                            <label className="col-sm-12 col-form-label text-light">Email: </label>
                            <input className="form-control" type="email" name="email" id="email" required />
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label text-light" >Password: </label>
                            <input className="form-control" name="pass" id="pass" type="password" required />
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



export { RegistrarUsuario }