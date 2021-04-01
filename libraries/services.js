const mysql = require('mysql');
const {config} = require('../configuration/dbConfig')

let connection;

async function getById(id) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, name, is_deliverable, is_enable, description, establishment_id FROM services where id='${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
        connection.end();
    });
}

async function getByEstablishment(establishmentId) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, name, is_deliverable, is_enable, description, establishment_id FROM services where establishment_id='${establishmentId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            console.log(results);
            return resolve(results);
        });
        connection.end();
    });
}
module.exports = {
    getById,
    getByEstablishment
}