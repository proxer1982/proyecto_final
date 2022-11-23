import logopri from "../assets/img/logoDevelopers.svg";
import  "../assets/css/login.css"
import {useCookies} from "react-cookie"
import {srvBck, srvFrt} from "../constantes.js"
import { Link } from "react-router-dom"

function Login () {
  const [cookies, setCookie, removeCookie] = useCookies(['id_user', 'role', "name_user"]);

  function loguear (e) {
    e.preventDefault();
    const email = document.getElementById("email_login").value
    const pass = document.getElementById("pass_login").value
  
    if(!email || !pass){
      alert("Ingrese los datos")
      return
    }
    let url = srvBck + "/usuario/" + email + "/" + pass
    
    fetch(url)
    .then(resp => resp.json())
    .then(datos => {
      console.log(datos)
      if(!datos.error){
        setCookie("id_user", datos._id, { path: '/' })
        setCookie("role", datos.rol, { path: '/' })
        setCookie("name_user", datos.nombre, { path: '/' })
        if(datos.rol === "admin"){
          window.location.href= srvFrt + "/"
        } else {
          window.location.href= srvFrt + "/"
        }
        
      } else {
        alert(datos.error)
      }
      
    })
    .catch((error) => console.log(error.message))
      
    
  }

    return (
      <section className="vh-100">
        <div className="container-fluid h-custom"> 
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5 d-flex">
              <img src={logopri} className="img-fluid logo-img" alt="Sample image" />
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
              <div className="form-outline mb-4 text-center mb-5">
                    <h2>INGRESAR</h2>
                </div>
              <div className="form-outline mb-5">
            <input type="email" id="email_login" className="form-control form-control-lg"
              placeholder="Correo electrónico" />
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="pass_login" className="form-control form-control-lg"
              placeholder="Contraseña" />
          </div>

          <div className="text-center mt-5 pt-2">
          
              <button className="btn btn-primary btn-lg btn-login" onClick={loguear}>Ingresar</button> 
            <p className="small mt-5 pt-1 mb-0">¿No tienes una cuenta? <Link className="link-registro" to={"registrar"}>Registrar</Link></p>
          </div>
          
              </form>
          </div></div>
        </div>

      
      </section>
    )
}


export {Login}