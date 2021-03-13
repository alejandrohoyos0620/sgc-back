const CustomerLib = require('../libraries/customers');

class CustomerService {
    constructor() {
        this.table = 'customers';
        this.CustomerLib = CustomerLib;
    }

    async registerCustomer(registerParams) {
        let separator = `','`;
        let values = `'${Object.values(registerParams).join(separator)}'`;
        console.log(values);
        const confirm = await this.CustomerLib.registerACustomer(this.table, values);
        return confirm;
    }
}

module.exports = CustomerService;
