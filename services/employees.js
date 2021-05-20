const crypto = require('crypto-js');
const EmployeesMap = require('../utils/maps/employees');
const EstablishmentsService = require('./establishments');

class EmployeeService {
    constructor() {
        this.EmployeeLib = require('../libraries/employees');
        this.establishmentService = new EstablishmentsService();
    }

    //method to register an employee
    async register(registerParams) {
        registerParams.password = crypto.AES.encrypt(registerParams.password, process.env.AES_KEY).toString();  //encrypt employee's password using AES_KEY
        let registerValues = new EmployeesMap(null, registerParams.sub, registerParams.role, registerParams.address, registerParams.phone, registerParams.email, registerParams.password, registerParams.establishmentId);  //Map the employee before send him to the database
        let separator = `','`;
        let values = `'${Object.values(registerValues).join(separator)}'`;  //join employee's object values before add them to a query into the library
        const confirm = await this.EmployeeLib.register(values);
        return confirm;
    }


    //method to update employee's basic information
    async update(updateParams) {
        const confirm = await this.EmployeeLib.update(updateParams);
        return confirm;
    }

    //method to get a specific employee
    async getById(id) {
        let employee = await this.EmployeeLib.getById(id);
        employee = new EmployeesMap(employee.id, employee.name, employee.role, employee.address, employee.phone_number, employee.email, null, await this.establishmentService.getById(employee.establishment_id));  //the database response is mapped to a more friendly object
        return employee;
    }

    //method to list all availables repairmans from an establishment
    async listAvailablesRepairmansByEstablishment(establishmentId, date, hour) {
        let repairmansList = await this.EmployeeLib.getAvailableRepairmansByEstablishment(establishmentId, date, hour);     
        let mappedRepairmansList = [];
        for(let repairman of repairmansList) {
            mappedRepairmansList.push(  //map each repairman in the list
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