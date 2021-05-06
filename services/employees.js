const crypto = require('crypto-js');
const EmployeesMap = require('../utils/maps/employees');
const EstablishmentsService = require('./establishments');

class EmployeeService {
    constructor() {
        this.EmployeeLib = require('../libraries/employees');
        this.establishmentService = new EstablishmentsService();
    }

    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();
        let registerValues = new EmployeesMap(null, registerParams.sub, registerParams.role, registerParams.address, registerParams.phone, registerParams.email, registerParams.password, registerParams.establishmentId);
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;
        const confirm = await this.EmployeeLib.register(values);
        return confirm;
    }

    async update(updateParams) {
        const confirm = await this.EmployeeLib.update(updateParams);
        return confirm;
    }

    async getById(id) {
        let employee = await this.EmployeeLib.getById(id);
        employee = new EmployeesMap(employee.id, employee.name, employee.role, employee.address, employee.phone_number, employee.email, null, await this.establishmentService.getById(employee.establishment_id));
        return employee;
    }

    async listAvailablesRepairmansByEstablishment(establishmentId, date, hour) {
        let repairmansList = await this.EmployeeLib.getAvailablesRepairmansByEstablishment(establishmentId, date, hour);
        let mappedRepairmansList = [];
        for(let repairman of repairmansList) {
            mappedRepairmansList.push(
                new EmployeesMap(
                    repairman.id, 
                    repairman.name, 
                    repairman.role, 
                    repairman.address, 
                    repairman.phone_number, 
                    repairman.email, 
                    repairman.password, 
                    await this.establishmentService.getById(repairman.establishment_id)
                )
            );
        }
        return mappedRepairmansList;
    }
}

module.exports = EmployeeService;