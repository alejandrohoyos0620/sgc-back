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

    async update(updateParams) {
        const confirm = await this.EmployeeLib.update(this.table, updateParams);
        return confirm;
    }

    async getEmployee(email) {
        let employee = await this.EmployeeLib.getEmployee(this.table, email);
        employee = new EmployeesMap(employee.name, employee.role, employee.address, employee.phone_number, employee.email, employee.establishment_nitit);
        return employee;
    }
}

module.exports = EmployeeService;