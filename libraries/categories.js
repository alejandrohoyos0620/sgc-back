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
        connection.query(`SELECT id, name, establishment_id FROM categories where id='${id}'`, (error, results, fields) => {
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
        connection.query(`SELECT id, name, establishment_id FROM categories where establishment_id='${establishmentId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function create(category) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO categories (name, establishment_id) VALUES (${category});`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function update(category) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE categories SET name = '${category.name}', establishment_id = '${category.establishmentId}' WHERE id = '${category.id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function deleteCategory(id) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM categories WHERE id = '${id}'`, (error, results, fields) => {
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
    deleteCategory
}