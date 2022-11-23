import { useState } from "react";
import {ItemVenta} from "./child/itemVenta.js"
import {srvBck} from "../../constantes.js"

function ListaVentas() {
    
    let [datosVentas, setDatos] = useState("")
    let [total, setTotal] = useState(0)
    let valorTotal = 0
    fetch( srvBck + "/ventas" )
    .then(res=>res.json())
    .then((datos)=>{
        
        setDatos(datosVentas = datos.map(item => {
            let fecha = new Date(item.fecha)
            fecha = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear()

            let subtotal = 0
            item.items.forEach(element => {
                subtotal += element.valor*element.cantidad
            });
            valorTotal += subtotal
            console.log(valorTotal)
            return(
                <ItemVenta fecha={fecha} nombre={item.cliente.nombre} subtotal={subtotal} items={item.items} id="ventas" />
            )
            
        }))
        setTotal(total = valorTotal)
    })
    .catch( err => console.error(err));


    return (
        <div className="w-100">
           <div><div>
        <h1 className="text-center">Lista de Ventas</h1>
    </div>
    <div className="p-3">
        <table className="table w-100">
            <thead className="table-dark">
                <tr>
                    <td>Fecha</td>
                    <td>Cliente</td>
                    <td>Productos</td>
                    <td>Valor</td> 
                </tr>
            </thead>
            <tbody>{datosVentas}</tbody>
            <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="text-end"><b>Total</b></td>
                    <td className="text-end"><b>$ {total}</b></td>
                </tr> 
            </tfoot>
        </table>
    </div>
    </div>
        </div>
    )

}

export {ListaVentas}