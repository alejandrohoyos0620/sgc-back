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
        for(let [index, hiredService] of hiredServicesList.entries()) {
            hiredServicesList[index].customer = await this.customersService.getById(hiredService.customer_id);
            hiredServicesList[index].employee = hiredService.repairman_id ? await this.employeesService.getById(hiredService.repairman_id) : null;
            hiredServicesList[index].service = await this.servicesService.getById(hiredService.service_id);
            hiredServicesList[index].device = await this.devicesService.getById(hiredService.device_id);
            delete hiredServicesList[index].customer_id;
            delete hiredServicesList[index].employee_id;
            delete hiredServicesList[index].service_id;
            delete hiredServicesList[index].device_id;
            mappedHiredServicesList.push(new HiredServicesMap(
                hiredService.id, 
                hiredServicesList[index].customer, 
                hiredServicesList[index].employee, 
                hiredServicesList[index].service, 
                hiredServicesList[index].device, 
                hiredService.status,
                hiredService.created_at,
                hiredService.description,
                hiredService.hour,
                hiredService.date
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

    async listByCustomer(customerId) {
        let hiredServicesList = await this.HiredServiceLib.getByCustomer(customerId);
        return this.mapList(hiredServicesList);
    }

    async changeStatus(id, newStatus) {
        let confirm = await this.HiredServiceLib.changeStatus(id, newStatus);
        return confirm;
    }

    async getById(id) {
        let hiredService = await this.HiredServiceLib.getById(id);
        let mappedHiredService = new HiredServicesMap(
            hiredService.id, 
            await this.customersService.getById(hiredService.customer_id),
            hiredService.repairman_id ? await this.employeesService.getById(hiredService.repairman_id) : null, 
            await this.servicesService.getById(hiredService.service_id),
            await this.devicesService.getById(hiredService.device_id), 
            hiredService.status,
            hiredService.created_at,
            hiredService.description,
            hiredService.hour,
            hiredService.date
        );
        return mappedHiredService;
    }

    async assignToARepairman(hiredServiceId, repairmanId) {
        let confirm = await this.HiredServiceLib.assignToARepairman(hiredServiceId, repairmanId);
        return confirm;
    }

    async approve(hiredServiceId, repairmanId) {
        return [
            await this.assignToARepairman(hiredServiceId, repairmanId),
            await this.changeStatus(hiredServiceId, 'approved'),
            await this.getById(hiredServiceId)
        ];
    }

    async create(hiredServiceParams) {
        let values = new HiredServicesMap(
            null, 
            hiredServiceParams.customerId, 
            null, 
            hiredServiceParams.serviceId, 
            hiredServiceParams.deviceId, 
            hiredServiceParams.status ? hiredServiceParams.status : 'notApproved', 
            null, 
            hiredServiceParams.description, 
            hiredServiceParams.hour ? hiredServiceParams.hour : null, 
            hiredServiceParams.date ? hiredServiceParams.date : null
        );
        let separator = `','`;
        values = `'${Object.values(values).join(separator)}'`;
        let results = await this.HiredServiceLib.create(values);
        return [
            results,
            results.insertId
        ];
    }
}

module.exports = HiredServiceService;