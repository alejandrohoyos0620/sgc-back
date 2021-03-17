const crypto = require('crypto-js');
class CustomerService {
    constructor() {
        this.table = 'customers';
        this.CustomerLib = require('../libraries/customers');
    }

    generateSecret() {
        const LIMIT = 256;
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let secret = '';
        for(let i = 0; i < LIMIT; i++) {
            secret += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return secret;
    }

    async registerCustomer(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();
        registerParams.secret = this.generateSecret();
        let separator = `','`;
        let values = `'${Object.values(registerParams).join(separator)}'`;
        const confirm = await this.CustomerLib.registerACustomer(this.table, values);
        return confirm;
    }
}

module.exports = CustomerService;
