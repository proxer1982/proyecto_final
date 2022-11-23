import './App.css';
import { useState } from 'react';
import Footer from './componentes/footer';
import { BrowserRouter } from "react-router-dom";
import { Navegacion } from './componentes/navegacion.js'; 
import { MenuNavegacion } from './componentes/menuNavegacion.js'
import { withCookies, Cookies, useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(['id_user', 'role', "carrito"]);
  return (
    <div className="App d-flex flex-column h-100">
      <div className={cookies.role === "admin" || cookies.role === "user" ? ('flex-grow-1 fondo-blanco') : ('flex-grow-1 fondo-oscuro')} >
        <BrowserRouter>     

          <MenuNavegacion rol={cookies.role} />
          <Navegacion rol={cookies.role} id_user={cookies.id_user} />

        </BrowserRouter>
      </div>
      <Footer/>
    </div>
  )
}


export default withCookies(App);