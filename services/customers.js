const crypto = require('crypto-js');
const CustomersMap = require('../utils/maps/customers');

class CustomerService {
    constructor() {
        this.table = 'customers';
        this.CustomerLib = require('../libraries/customers');
    }

    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();
        let registerValues = new CustomersMap(registerParams.fullName, registerParams.phone, registerParams.city, registerParams.address, registerParams.email, registerParams.password);
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;
        const confirm = await this.CustomerLib.register(this.table, values);
        return confirm;
    }
}

module.exports = CustomerService;
