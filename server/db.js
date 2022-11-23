import Mongo from "mongoose"
import {MONGODB_URI} from "./config.js"

export async function DBconnection (){
    try {
        const db = await Mongo.connect(MONGODB_URI); 
        console.log("Connexion Mongo altlas con " + db.connection.name)
    } catch(error) {
        console.log(error.message)
    } 
}