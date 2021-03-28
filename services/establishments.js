const EstablishmentsMap = require('../utils/maps/establishments');

class EstablishmentService {
    constructor() {
        this.table = 'establishments';
        this.establishmentLib = require('../libraries/establishments');
    }
    async getById(id) {
        let establishment = await this.establishmentLib.getById(this.table, id);
        establishment = new EstablishmentsMap(
            establishment.id, establishment.nit, establishment.name, establishment.address, 
            establishment.city, establishment.phone_number, establishment.email, establishment.opening_time, establishment.closing_time
        );
        return establishment;
    }
}

module.exports = EstablishmentService;