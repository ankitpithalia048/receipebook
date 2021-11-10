const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "",
    database: "ReceipeBook"
})

module.exports = client