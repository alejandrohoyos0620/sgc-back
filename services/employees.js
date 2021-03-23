const crypto = require('crypto-js');
const EmployeesMap = require('../utils/maps/employees');

class EmployeeService {
    constructor() {
        this.table = 'employees';
        this.EmployeeLib = require('../libraries/employees');
    }

    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();
        let registerValues = new EmployeesMap(registerParams.fullName, registerParams.role, registerParams.address, registerParams.phone, registerParams.email, registerParams.password, registerParams.establishmentNit);
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;
        const confirm = await this.EmployeeLib.register(this.table, values);
        return confirm;
    }
}

module.exports = EmployeeService;