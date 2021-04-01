const ServicesMap = require('../utils/maps/services');
const EstablishmentsService = require('./establishments');
class ServiceService {
    constructor() {
        this.ServiceLib = require('../libraries/services');
        this.establishmentService = new EstablishmentsService();
    }

    async getById(id) {
        let service = await this.ServiceLib.getById(id);
        service = new ServicesMap(
            service.id, service.name, 
            service.is_deliverable,
            service.is_enable, 
            service.description,
            await this.establishmentService.getById(service.establishment_id)
        );
        return service;
    }
}

module.exports = ServiceService;