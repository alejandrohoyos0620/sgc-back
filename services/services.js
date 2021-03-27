const ServicesMap = require('../utils/maps/services');
class ServiceService {
    constructor() {
        this.table = 'services';
        this.ServiceLib = require('../libraries/services');
    }

    async getById(id) {
        let service = await this.ServiceLib.getById(this.table, id);
        service = new ServicesMap(
            service.id, service.name, service.is_deliverable, service.description, service.price, service.is_enable, service.establishment_nit
        );
        return service;
    }
}

module.exports = ServiceService;