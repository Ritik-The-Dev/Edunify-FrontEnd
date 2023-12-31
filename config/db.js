const {createPool} = require("mysql")
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Ritik@86309",
    port:4000,
    database:"data"
})

pool.getConnection((err)=>{
    if (err){
        console.log("Error while Connecting to db")
    }
    else{
        console.log("Connected Successfully to Db")
    }
})
module.exports = pool;