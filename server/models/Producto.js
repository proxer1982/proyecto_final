import Mongo from "mongoose"

const productoSchema = new Mongo.Schema({
    nombreProducto:{
        type:String,
        required: true,
        trim: true
    },
    imagen:{
        url:String,
        public_id:String
    },
    stock:{
        type:Number,
        required: true,
        trim: true
    },
    precio:{
        type:Number,
        required: true,
        trim: true
    },
    descripcion:{
        type:String,
        required: false,
        trim: true
    }
}, {versionKey:false})

export const ProductoModelo = Mongo.model("productos",productoSchema)