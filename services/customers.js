const crypto = require('crypto-js');
const CustomersMap = require('../utils/maps/customers');

class CustomerService {
    constructor() {
        this.table = 'customers';
        this.CustomerLib = require('../libraries/customers');
    }

    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();
        let registerValues = new CustomersMap(null, registerParams.fullName, registerParams.phone, registerParams.city, registerParams.address, registerParams.email, registerParams.password);
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;
        const confirm = await this.CustomerLib.register(this.table, values);
        return confirm;
    }

    async update(updateParams) {
        const confirm = await this.CustomerLib.update(this.table, updateParams);
        return confirm;
    }

    async getCustomer(email) {
        let customer = await this.CustomerLib.getCustomer(this.table, email);
        customer = new CustomersMap(customer.id, customer.name, customer.phone_number, customer.city, customer.address, customer.email);
        return customer;
    }

    async getById(id) {
        let customer = await this.CustomerLib.getById(this.table, id);
        customer = new CustomersMap(customer.id, customer.name, customer.phone_number, customer.city, customer.address, customer.email);
        return customer;
    }
}

module.exports = CustomerService;
