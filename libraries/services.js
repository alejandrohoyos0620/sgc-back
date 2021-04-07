const mysql = require('mysql');
const {config} = require('../configuration/dbConfig');

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
        connection.query(`SELECT id, name, is_deliverable, price, is_enable, description, establishment_id FROM services where id='${id}'`, (error, results, fields) => {
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
        connection.query(`SELECT id, name, is_deliverable, price, is_enable, description, establishment_id FROM services where establishment_id='${establishmentId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function create(service) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO services (name, is_deliverable, price, is_enable, description, establishment_id) VALUES (${service});`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function update(service) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE services SET name = '${service.name}', is_deliverable = '${service.isDeliverable}', price = '${service.price}', is_enable = '${service.isEnable}', description = '${service.description}', establishment_id = '${service.establishmentId}' WHERE id = '${service.id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function deleteService(id) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM services WHERE id = '${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    getById,
    getByEstablishment,
    update,
    create,
    deleteService
};