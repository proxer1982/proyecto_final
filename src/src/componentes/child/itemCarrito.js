import { useState } from "react";
import { faTrashAlt, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {srvFrt} from '../../constantes.js'
import {useCookies} from "react-cookie"


function ItemCarrito (props) {
    let carrito = {_:""}

    const {llamar} = props
    const [cookies, setCookie, removeCookie] = useCookies(['carrito']);

    let id_prod = props.idele
    let [imagenP, setImagenP] = useState(props.imagen)
    let [nombreP, setNombreP] = useState(props.nombre)
    let [precioP, setPrecioP] = useState(props.precio)
    let [cantidadP, setCantidadP] = useState(props.cantidad)
    let [subtotalP, setSubtotalP] = useState(props.precio * props.cantidad)


    const delItemcarrito = () => {
        
        if(window.confirm("esta seguro de eliminar el porducto")){

            carrito = cookies.carrito
            let idDel = buscarPro(carrito)
                
            carrito.splice(idDel, 1);
            
            setCookie("carrito", carrito, { path: '/' })
            window.location.href= srvFrt + "/carrito"
        }
    }


    const setCarrito = (acc) => {
        let carritoNew = cookies.carrito
        let idDel = buscarPro(carritoNew)
        
        if(acc === "mas"){
            console.log("aumentar")
            carritoNew[idDel].cantidad += 1
        } else {
            carritoNew[idDel].cantidad -= 1

            if(carritoNew[idDel].cantidad < 1){
                carritoNew.splice(idDel, 1);
                setCookie("carrito", carritoNew, { path: '/' })
                window.location.href= srvFrt + "/carrito"
            }
        }
        //llamar()
        console.log(carritoNew)
        setCookie("carrito", carritoNew, { path: '/' })
        setCantidadP(cantidadP = carritoNew[idDel].cantidad)
        setSubtotalP(subtotalP = carritoNew[idDel].cantidad * carritoNew[idDel].valor)
        
    }

    function buscarPro(carr){
        let ind = null
        carr.forEach((prod, indice) => {
           
            if(prod._id === id_prod){
                 ind = indice
            }
        })
        return ind;
    }

    return (
        <tr id={id_prod}>
            <td className="caja text-center">{props.ind + 1}</td>
            <td className="caja text-center d-none d-lg-table-cell"><img src={imagenP} width={50}/> </td>
            <td className="caja casillaCantidad text-center px-3">
                <div className="espacioCantidad">
                    <input type="hidden" id="cantidad" value={cantidadP} />
                    <strong className="flex-fill" id="caja-cant">{cantidadP}</strong>
                    <button onClick={() => setCarrito("menos")} className="btn ms-3 me-1" idele={props.idele} ><FontAwesomeIcon icon={faMinus} /></button>
                    <button onClick={() => setCarrito("mas")} className="btn mx-1" idele={props.idele} ><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </td>
            <td className="caja text-center px-2">{nombreP}</td>
            <td className="caja text-end">$ {precioP}</td>
            <td className="text-end"><b>$ {subtotalP}</b></td>
            <td className="text-center">
                <button className="btn btn-dark mx-3" onClick={delItemcarrito} ><FontAwesomeIcon icon={faTrashAlt} /></button>
            </td>
        </tr>
    )
}


export {ItemCarrito}