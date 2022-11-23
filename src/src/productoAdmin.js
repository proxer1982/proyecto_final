function ProductoAdmin(props) {
    function agregar(){
        //agregarCarrito("producto")
    }

    return(
        <div className="d-flex align-items-stretch">
            {props.productos.map(prod => {
                return (
                    <div className="col-3 p-1">
                        <div className="cajaimagen h-100">
                            <div className="imagen p-2">
                                <img src={prod.imagen.url} width="100%" />
                            </div>
                            <div className="descripcion mt-2 p-2">
                                    <h4 className="text-center">{prod.nombreProducto}</h4>
                                    <p>$ {prod.precio}</p>
                                    <p>Stock: {prod.stock}</p>
                                    <p>{prod.descripcion}</p>
                            </div>
                            <div className="boton-carrito mt-1 text-center">
                                    <button type="button" className="btn btn-primary" onClick={agregar} >Agregar a carrito</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductoAdmin