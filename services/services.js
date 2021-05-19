const ServicesMap = require('../utils/maps/services');
const EstablishmentsService = require('./establishments');
class ServiceService {
    constructor() {
        this.ServiceLib = require('../libraries/services');
        this.establishmentService = new EstablishmentsService();
    }

    //method to map all services in a list
    async mapList(servicesList) {
        let mappedServicesList = [];
        for(let [index, service] of servicesList.entries()) {  //we got the element and the iterator of te cycle
            servicesList[index].establishment = await this.establishmentService.getById(service.establishment_id);
            delete servicesList[index].establishment_id;
            mappedServicesList.push(new ServicesMap(  //map database response to a more friendly ervice object
                service.id, 
                service.name, 
                service.is_deliverable,
                service.price,
                service.is_enable, 
                service.description,
                servicesList[index].establishment
                )
            );
        }
        return mappedServicesList;
    }

    //method to get a specific service
    async getById(id) {
        let service = await this.ServiceLib.getById(id);
        service = new ServicesMap(
            service.id, 
            service.name, 
            service.is_deliverable,
            service.price,
            service.is_enable, 
            service.description,
            await this.establishmentService.getById(service.establishment_id)
        );
        return service;
    }

    //method to get  all services from an establishment
    async listByEstablishment(establishmentId) {
        let servicesList = await this.ServiceLib.getByEstablishment(establishmentId);
        return this.mapList(servicesList);
    }

    //method to get all services from an establishment and which matches with an specific status
    async listByEstablishmentAndType(establishmentId, type) {
        let servicesList;
        if(type === 'delivery') {
            servicesList = await this.ServiceLib.getByEstablishmentAndType(establishmentId, type);
            return this.mapList(servicesList);
        } else {
            return this.listByEstablishment(establishmentId);
        } 
    }
    
    //method to create a service
    async create(params) {
        let createValues = new ServicesMap(  //map the service's information to a correct object
            null, params.name, params.isDeliverable, params.price, 
            params.isEnable, params.description, params.establishmentId);
        let separator = `','`;
        let values = `'${Object.values(createValues).join(separator)}'`;  //join service's object values before add it to a query into the library
        const confirm = await this.ServiceLib.create(values);
        return confirm;
    }
    
    //method to update the service's information
    async update(params) {
        const confirm = await this.ServiceLib.update(params);
        return confirm;
    }

    //method to delete a service
    async delete(id) {
        const confirm = await this.ServiceLib.deleteService(id);
        return confirm;
    }
}

module.exports = ServiceService;