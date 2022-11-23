import {DBconnection} from "./db.js"
import {PORT} from "./config.js"
import app from "./app.js"

DBconnection() 

app.listen(PORT, function(){
    console.log("Servidor iniciado")
})
