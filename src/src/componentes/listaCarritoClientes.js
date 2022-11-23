import { useState } from "react";
import { ItemCarrito } from "./child/itemCarrito.js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { srvBck, srvFrt } from '../constantes.js'
import { useCookies } from "react-cookie"

function ListaCarrito() {
    const [cookies, setCookie, removeCookie] = useCookies(['carrito', 'name_user', 'id_user']);
    const [show, setShow] = useState(false);

    let actTotal = null
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        actualizarTotal()
        setShow(true)    
    }
    
    const handleComprar = () => {
        setShow(false) //esto es para ocultar la ventana emergente
        let carritoNew = cookies.carrito //obteniendo carrito de compras

        carritoNew.forEach ((producto) => {

            fetch(srvBck + "/producto/" + producto._id)
            .then(resp => resp.json())
            .then(datos => {
                datos.stock -= producto.cantidad
                fetch(srvBck + '/producto/' + producto._id, {
                    method: 'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(datos)
                })
                .then(resp => resp.json())
                .then(datos => console.log(datos))
            })
        })
       
        let venta = {
            cliente:{
                id: cookies.id_user,
                nombre: cookies.name_user
            },
            items: carritoNew
        }

        fetch(srvBck +'/ventas/', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(venta)
        })
        .then(resp => resp.json())
        .then(datos => {
            setCookie("carrito", [], { path: '/' })
            window.location.href = srvFrt + "/"
        })
    }

    let [campo, setCampo] = useState("")
    
    let carrito = cookies.carrito

    if (carrito === undefined) {
        carrito = []
    }
    let tot = 0
    carrito.forEach(element => {
        tot += element.valor * element.cantidad
    });
    const [totalFin, setTotalfin] = useState(tot);
    

    const deleteCarrito = (acc) => {
        if (window.confirm("¿Esta seguro de vaciar el carrito?")) {
            setCookie("carrito", [], { path: '/' })
            setCampo(campo = <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>)
            setTotalfin(0)
        }

    }

    function actualizarTotal () {
        let productos = cookies.carrito
        let totalNew = 0

        productos.forEach((elemt) => {
            totalNew += elemt.valor*elemt.cantidad
        })
        console.log(totalNew)
        setTotalfin(totalNew)
    }

    return (
        <div className="w-100">
            <div>
                <h1 className="text-center">Carrito de compra</h1>
            </div>
            <div className="p-3">
                <Table className="align-middle">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center d-none d-lg-table-cell">Imagen</th>
                            <th className="text-center">Und</th>
                            <th className="text-center">Producto</th>
                            <th className="text-center">Valor Unitario</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {carrito.map((prod, ind) => {
                            return (<ItemCarrito key={ind}
                                ind={ind}
                                precio={prod.valor}
                                imagen={prod.imagen}
                                nombre={prod.nombre}
                                cantidad={prod.cantidad}
                                idele={prod._id} />)
                        })}
                        <tr><td colSpan={4}></td><td>Total</td><td className="text-end"><b>{totalFin}</b></td><td></td></tr>
                    </tbody>
                </Table>
            </div>
            <div className="text-end mb-5">

                <button type="button" onClick={() => actualizarTotal()} className="btn btn-dark">Actualizar carrito</button>
                <button type="button" onClick={deleteCarrito} className="btn btn-dark ms-3">Vaciar carrito</button>
                <Button type="button" variant="dark" onClick={handleShow} className="ms-3">Finalizar Compra</Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Pagar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>tu compra es por un valor de {totalFin}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleComprar}>
                            Finalizar compra
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )

}

export { ListaCarrito }