const ServicesMap = require('../utils/maps/services');
const EstablishmentsService = require('./establishments');
class ServiceService {
    constructor() {
        this.table = 'services';
        this.ServiceLib = require('../libraries/services');
        this.establishmentService = new EstablishmentsService();
    }

    async getById(id) {
        let service = await this.ServiceLib.getById(this.table, id);
        service = new ServicesMap(
            service.id, service.name, service.is_deliverable, service.description, service.price, 
            service.is_enable, await this.establishmentService.getById(service.id)
        );
        return service;
    }
}

module.exports = ServiceService;