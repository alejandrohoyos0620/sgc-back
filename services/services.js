const ServicesMap = require('../utils/maps/services');
const EstablishmentsService = require('./establishments');
class ServiceService {
    constructor() {
        this.ServiceLib = require('../libraries/services');
        this.establishmentService = new EstablishmentsService();
    }

    async mapList(servicesList) {
        let mappedServicesList = [];
        for(let [index, service] of servicesList.entries()) {
            servicesList[index].establishment = await this.establishmentService.getById(service.establishment_id);
            delete servicesList[index].establishment_id;
            mappedServicesList.push(new ServicesMap(
                service.id, 
                service.name, 
                service.is_deliverable,
                service.is_enable, 
                service.description,
                servicesList[index].establishment
                )
            );
        }
        return mappedServicesList;
    }

    async getById(id) {
        let service = await this.ServiceLib.getById(id);
        service = new ServicesMap(
            service.id, 
            service.name, 
            service.is_deliverable,
            service.is_enable, 
            service.description,
            await this.establishmentService.getById(service.establishment_id)
        );
        return service;
    }

    async listByEstablishment(establishmentId) {
        let servicesList = await this.ServiceLib.getByEstablishment(establishmentId);
        return this.mapList(servicesList);
    }
}

module.exports = ServiceService;