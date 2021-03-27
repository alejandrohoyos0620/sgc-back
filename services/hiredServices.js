const CustomersService = require('./customers');
const EmployeesService = require('./employees');
const ServicesService = require('./services');
const DevicesService = require('./devices');
const HiredServicesMap = require('../utils/maps/hiredServices');

class HiredServiceService {
    constructor() {
        this.HiredServiceLib = require('../libraries/hiredServices');
        this.customersService = new CustomersService();
        this.employeesService = new EmployeesService();
        this.servicesService = new ServicesService();
        this.devicesService = new DevicesService();
    }

    async mapList(hiredServicesList) {
        let mappedHiredServicesList = [];
        for(let hiredService of hiredServicesList) {
            hiredServicesList[hiredService].customer = await this.customersService.getById(hiredService.customer_id);
            hiredServicesList[hiredService].employee = await this.employeesService.getById(hiredService.employee_id);
            hiredServicesList[hiredService].service = await this.servicesService.getById(hiredService.service_id);
            hiredServicesList[hiredService].device = await this.devicesService.getById(hiredService.device_id);
            delete hiredServicesList[hiredService].customer_id;
            delete hiredServicesList[hiredService].employee_id;
            delete hiredServicesList[hiredService].service_id;
            delete hiredServicesList[hiredService].device_id;
            mappedHiredServicesList.push(new HiredServicesMap(
                hiredService.id, hiredServicesList[hiredService].customer, hiredServicesList[hiredService].employee, 
                hiredServicesList[hiredService].service, hiredServicesList[hiredService].device, hiredService.status
                )
            );
        }
        return mappedHiredServicesList;
    }

    async listByEstablishmentAndStatus(establishmentId, status) {
        let hiredServicesList = await this.HiredServiceLib.getByEstablishmentAndStatus(establishmentId, status);
        return this.mapList(hiredServicesList);
    }

    async listByRepairmanAndStatus(repairmanId, status) {
        let hiredServicesList = await this.HiredServiceLib.getByRepairmanAndStatus(repairmanId, status);
        return this.mapList(hiredServicesList);
    }

    async changeStatus(id, newStatus) {
        let confirm = await this.HiredServiceLib.changeStatus(this.table, id, newStatus);
        return confirm;
    }

    async getById(id) {
        let hiredService = await this.HiredServiceLib.getById(this.table, id);
        let mappedHiredService = new HiredServicesMap(
            hiredService.id, await this.customersService.getById(hiredService.customer_id),
            await this.employeesService.getById(hiredService.repairman_id), 
            await this.servicesService.getById(hiredService.service_id),
            await this.devicesService.getById(hiredService.device_id), 
            hiredService.status
        );
        return mappedHiredService;
    }

    async asignToARepairman(hiredServiceId, repairmanId) {
        let confirm = await this.HiredServiceLib.setRepairman(this.table, hiredServiceId, repairmanId);
        return confirm;
    }

    async approve(hiredServiceId, repairmanId) {
        return [
            await this.asignToARepairman(hiredServiceId, repairmanId),
            await this.changeStatus(hiredServiceId, 'approved'),
            await this.getById(hiredServiceId)
        ];
    }
}

module.exports = HiredServiceService;