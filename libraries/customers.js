const mysql = require('mysql');
const {config} = require('../configuration/dbConfig')

let connection;

async function registerACustomer(table, params) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} (name, phone_number, city, address, email, password) VALUES (${params});`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    registerACustomer
};
