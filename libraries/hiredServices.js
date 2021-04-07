const mysql = require('mysql');
const {config} = require('../configuration/dbConfig');

let connection;


async function getByEstablishmentAndStatus(establishmentId, status) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        console.log(establishmentId);
        connection.query(`SELECT * FROM hired_services where status = '${status}' AND service_id in (
            SELECT id FROM services WHERE establishment_id ='${establishmentId}')`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            console.log(results);
            return resolve(results);
        });
        connection.end();
    });
}

async function getByRepairmanAndStatus(repairmanId, status) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM hired_services WHERE repairman_id = '${repairmanId}' AND status = '${status}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function changeStatus(id, newStatus) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE hired_services SET status = '${newStatus}' WHERE id = '${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function assignToARepairman(id, repairmanId) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE hired_services SET repairman_id = '${repairmanId}' WHERE id = '${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}
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
        connection.query(`SELECT * FROM hired_services where id='${id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
        connection.end();
    });
}

module.exports = {
    getById,
    getByEstablishmentAndStatus,
    getByRepairmanAndStatus,
    changeStatus,
    assignToARepairman
};