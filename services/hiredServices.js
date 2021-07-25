const CustomersService = require('./customers');
const EmployeesService = require('./employees');
const ServicesService = require('./services');
const DevicesService = require('./devices');
const HiredServicesMap = require('../utils/maps/hiredServices');
const RatingsService = require('./ratings');

class HiredServiceService {
    constructor() {
        this.HiredServiceLib = require('../libraries/hiredServices');
        this.customersService = new CustomersService();
        this.employeesService = new EmployeesService();
        this.servicesService = new ServicesService();
        this.devicesService = new DevicesService();
        this.ratingsService = new RatingsService();
    }

    //method to map all hired services in a list
    async mapList(hiredServicesList, rating) {
        let mappedHiredServicesList = [];
        for(let [index, hiredService] of hiredServicesList.entries()) {  //we got the element and the iterator of te cycle
            //call to other services to get the full customer, employee, service and device objects
            hiredServicesList[index].customer = await this.customersService.getById(hiredService.customer_id);
            hiredServicesList[index].employee = hiredService.repairman_id ? await this.employeesService.getById(hiredService.repairman_id) : null;
            hiredServicesList[index].service = await this.servicesService.getById(hiredService.service_id);
            hiredServicesList[index].device = await this.devicesService.getById(hiredService.device_id);
            //delete all innecesary id's
            delete hiredServicesList[index].customer_id;
            delete hiredServicesList[index].employee_id;
            delete hiredServicesList[index].service_id;
            delete hiredServicesList[index].device_id;
            mappedHiredServicesList.push(new HiredServicesMap(  //map database response to a more friendly hired service object
                hiredService.id, 
                hiredServicesList[index].customer, 
                hiredServicesList[index].employee, 
                hiredServicesList[index].service, 
                hiredServicesList[index].device, 
                hiredService.status,
                hiredService.created_at,
                hiredService.description,
                hiredService.hour,
                hiredService.date,
                hiredService.type,
                rating ? await this.ratingsService.getByHiredService(hiredService.id) :  null
                )
            );
        }
        return mappedHiredServicesList;
    }

    //method to get all hired services from an establishment and which matches with an specific status
    async listByEstablishmentAndStatus(establishmentId, status) {
        let hiredServicesList = await this.HiredServiceLib.getByEstablishmentAndStatus(establishmentId, status);
        return status === 'finished' ? this.mapList(hiredServicesList, true) : this.mapList(hiredServicesList, false);
    }

    //method to get all hired services assigned to a specific repairman and which matches with an specific status
    async listByRepairmanAndStatus(repairmanId, status) {
        let hiredServicesList = await this.HiredServiceLib.getByRepairmanAndStatus(repairmanId, status);
        return this.mapList(hiredServicesList);
    }

    //method to get all hired services by a specific customer
    async listByCustomer(customerId) {
        let hiredServicesList = await this.HiredServiceLib.getByCustomer(customerId);
        return this.mapList(hiredServicesList, true);
    }

    //method to update the status of a specific hired services
    async changeStatus(id, newStatus) {
        let confirm = await this.HiredServiceLib.changeStatus(id, newStatus);
        return confirm;
    }

    //method to get a specific hired service
    async getById(id) {
        let hiredService = await this.HiredServiceLib.getById(id);
        let mappedHiredService = new HiredServicesMap(  //map database response to a more friendly hired service object
            hiredService.id, 
            await this.customersService.getById(hiredService.customer_id),
            hiredService.repairman_id ? await this.employeesService.getById(hiredService.repairman_id) : null, 
            await this.servicesService.getById(hiredService.service_id),
            await this.devicesService.getById(hiredService.device_id), 
            hiredService.status,
            hiredService.created_at,
            hiredService.description,
            hiredService.hour,
            hiredService.date,
            hiredService.type
        );
        return mappedHiredService;
    }

    //method to associate a specific repairman to a hired service
    async assignToARepairman(hiredServiceId, repairmanId) {
        let confirm = await this.HiredServiceLib.assignToARepairman(hiredServiceId, repairmanId);
        return confirm;
    }

    //method to associate a specific repairman to a hired service and update its status to "approved"
    async approve(hiredServiceId, repairmanId) {
        return [
            await this.assignToARepairman(hiredServiceId, repairmanId),
            await this.changeStatus(hiredServiceId, 'approved'),
            await this.getById(hiredServiceId)
        ];
    }

    //method to create a hired service
    async create(hiredServiceParams) {
        let values = new HiredServicesMap(  //map hired service's information to a correct object 
            null, 
            hiredServiceParams.customerId, 
            null, 
            hiredServiceParams.serviceId, 
            hiredServiceParams.deviceId, 
            hiredServiceParams.status ? hiredServiceParams.status : 'notApproved', 
            null, 
            hiredServiceParams.description, 
            hiredServiceParams.hour ? hiredServiceParams.hour : null, 
            hiredServiceParams.date ? hiredServiceParams.date : null,
            hiredServiceParams.type
        );
        let separator = `','`;
        values = `'${Object.values(values).join(separator)}'`;  //join hired service's object values before add it to a query into the library
        let results = await this.HiredServiceLib.create(values);
        return [  //return all results information and the id of the created hired service
            results,
            results.insertId
        ];
    }

    //method to delete an specific hired service
    async delete(hiredServiceId) {
        const confirm = await this.HiredServiceLib.deleteHiredService(hiredServiceId);
        return confirm;
    }
}

module.exports = HiredServiceService;