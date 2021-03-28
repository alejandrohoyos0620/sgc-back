const mysql = require('mysql');
const {config} = require('../configuration/dbConfig')

let connection;

async function register(table, params) {
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

async function login(email) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, name as sub, phone_number, city, address, email, password FROM customers where email='${email}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}
async function update(table, params) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET name = '${params.fullName}', phone_number = '${params.phone}', city = '${params.city}', address = '${params.address}' WHERE email = '${params.email}' AND id = '${params.id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

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
        connection.query(`SELECT id, name, phone_number, city, address, email FROM ${table} where id='${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
        connection.end();
    });
}

module.exports = {
    register,
    login,
    update,
    getById
};
