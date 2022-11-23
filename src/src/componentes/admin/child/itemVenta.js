import {Component} from "react"

class ItemVenta extends Component {

    constructor(props) {
        super(props);
    }

    render(){
    let productos = ""
    let subtotal = 0

    return(
        <tr>
            <td> { this.props.fecha } </td>
            <td>{this.props.nombre}</td>
            <td><ul>{this.props.items.map(ven => { return(<li><b>{ven.cantidad}</b> {ven.nombre} - <small>$ {ven.valor*ven.cantidad}</small></li>)})}</ul></td>
            <td className="text-end">$ {this.props.subtotal}</td>
        </tr>
    ) 
    }
}

export {ItemVenta}