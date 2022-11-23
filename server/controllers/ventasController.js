import {VentaModelo} from "../models/venta.js"

export const obtenerVentas = async (req, resp) => {
    try {
        let ventas = await VentaModelo.find()
        return resp.send(ventas)
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
    
}

export const buscarVentaID = async (req, resp) => { 
    try {
        let venta = await VentaModelo.findById(req.params.id)

        if(!venta){
            return resp.send("Venta no encontrada")
        } else {
            return resp.json(venta)
        }
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}

export const crearVenta = async (req, resp) => { 
    try {
        const {items, cliente} = req.body
        console.log(items)    
        const newVenta = new VentaModelo({items, cliente})

        await newVenta.save()
        return resp.json(newVenta)
    } 
    catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}

export const actualizarVenta = async (req, resp) => { 
    try {
        const venta = await VentaModelo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return resp.json(venta)
    } 
    catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}
