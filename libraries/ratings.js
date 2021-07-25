const mysql = require('mysql');
const {config} = require('../configuration/dbConfig');

let connection;

async function getByHiredService(hiredServiceId) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, score, commentary, hired_service_id FROM ratings where hired_service_id='${hiredServiceId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
        connection.end();
    });
}

async function create(rating) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
            console.log(rating);
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ratings (score, commentary, hired_service_id) VALUES (${rating});`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    getByHiredService,
    create,
};