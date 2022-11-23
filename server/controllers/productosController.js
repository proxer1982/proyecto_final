import {ProductoModelo} from "../models/Producto.js"
import {uploadImage, deleteImage} from "../libraries/cloudinary.js"
import fs from "fs-extra"

export const obtenerProductos = async (req, resp) => {
    try {
        let productos = await ProductoModelo.find()
        return resp.send(productos)
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
    
}


export const crearProductos = async (req, resp) => { 
    try {
        const {nombreProducto, stock, precio, descripcion} = req.body
        
        let imagen = null
        
        if(req.files.imagen){
            const archivo = await uploadImage(req.files.imagen.tempFilePath)
            await fs.remove(req.files.imagen.tempFilePath)
            
            imagen = {
                url:archivo.secure_url,
                public_id:archivo.public_id
            }
        }

        const newProducto = new ProductoModelo({ nombreProducto, imagen, stock, precio, descripcion })

        await newProducto.save()
        return resp.json(newProducto)
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}


export const actualizarProductos = async (req, resp) => { 
    try {
        const producto = await ProductoModelo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return resp.json(producto)
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}

export const eliminarProductos = async (req, resp) => { 
    try {
        const deleteP = await ProductoModelo.findByIdAndDelete(req.params.id)

        if(!deleteP){
            return resp.sendStatus(404)
        } else {
            if(deleteP.imagen.public_id){
                await deleteImage(deleteP.imagen.public_id)
            }
            
            return resp.sendStatus(204)
        }
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}

export const buscarProductosID = async (req, resp) => { 
    try {
        let producto = await ProductoModelo.findById(req.params.id)

        if(!producto){
            return resp.send("no se encontro el producto")
        } else {
            return resp.json(producto)
        }
    } catch (error) {
        return resp.status(500).json({'Error' : error.message})
    }
}