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
        connection.query(`SELECT id, name, category_id, price, brand, image, description, code, color, establishment_id, is_enable
        FROM products where id='${id}'`, (error, results, fields) => {
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
        connection.query(`SELECT id, name, category_id, price, brand, image, description, code, color, establishment_id, is_enable 
        FROM products where establishment_id='${establishmentId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function getByCategory(categoryId) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, name, category_id, price, brand, image, description, code, color, establishment_id, is_enable 
        FROM products where category_id='${categoryId}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function create(product) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO products (name, category_id, price, brand, image, description, code, color, establishment_id,
            is_enable) VALUES (${product});`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function update(product) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE products SET name = '${product.name}', category_id = '${product.categoryId}', 
        price = '${product.price}', brand = '${product.brand}', image = '${product.image}', description = '${product.description}',
        code = '${product.code}', color = '${product.color}', establishment_id = '${product.establishmentId}',
        is_enable = '${product.isEnable}' WHERE id = '${product.id}'`, (error, results, fields) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
        connection.end();
    });
}

async function deleteProduct(id) {
    connection = mysql.createConnection(config);
    connection.connect(function(error) {
        if(error) {
            throw error;
        } else {
            console.log('Conexión a MYSQL realizada exitosamente para update');
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM products WHERE id = '${id}'`, (error, results, fields) => {
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
    getByCategory,
    update,
    create,
    deleteProduct
};