import mysql from "mysql"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_gestao2',
})

export default db
