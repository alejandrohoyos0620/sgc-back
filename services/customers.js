const crypto = require('crypto-js');
const CustomersMap = require('../utils/maps/customers');

class CustomerService {
    constructor() {
        this.CustomerLib = require('../libraries/customers');
    }

    //method to register a customer
    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();  //encrypt customer's password using AES_KEY
        let registerValues = new CustomersMap(null, registerParams.sub, registerParams.phone, registerParams.city, registerParams.address, registerParams.email, registerParams.password);  //Map the customer before send him to the database
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;  //join customer's object values before add them to a query into the library
        const confirm = await this.CustomerLib.register(values); 
        return confirm;
    }

    //method to update customer's basic information
    async update(updateParams) {
        const confirm = await this.CustomerLib.update(updateParams);
        return confirm;
    }

    //method to get a specific customer
    async getById(id) {
        let customer = await this.CustomerLib.getById(id);
        customer = new CustomersMap(customer.id, customer.name, customer.phone_number, customer.city, customer.address, customer.email);  //the database response is mapped to a more friendly object
        return customer;
    }

    //method to get a specific customer by email
    async getByEmail(email) {
        let customer = await this.CustomerLib.getByEmail(email);
        customer = new CustomersMap(customer.id, customer.name, customer.phone_number, customer.city, customer.address, customer.email);  //the database response is mapped to a more friendly object
        return customer;
    }
}

module.exports = CustomerService;
