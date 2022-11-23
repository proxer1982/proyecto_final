import dotenv from 'dotenv' 

dotenv.config()

const PORT = process.env.PORT || 8080

const srvBck = "http://localhost:" + PORT
const srvFrt = "http://localhost:" + PORT

export {srvBck, srvFrt}