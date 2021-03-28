const mysql = require('mysql');
const {config} = require('../configuration/dbConfig')

let connection;

async function getById(table, id) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, nit, name, address, city, phone_number, email, opening_time, closing_time FROM ${table} where id='${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            console.log(results);
            return resolve(results[0]);
        });
        connection.end();
    });
}

module.exports = {
    getById
}