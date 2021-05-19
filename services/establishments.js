const EstablishmentsMap = require('../utils/maps/establishments');

class EstablishmentService {
    constructor() {
        this.establishmentLib = require('../libraries/establishments');
    }

    //method to get an specific establishment
    async getById(id) {
        let establishment = await this.establishmentLib.getById(id);
        establishment = new EstablishmentsMap(  //map the database response to a more friendly object
            establishment.id, establishment.nit, establishment.name, establishment.address, 
            establishment.city, establishment.phone_number, establishment.email, establishment.opening_time, establishment.closing_time
        );
        return establishment;
    }
}

module.exports = EstablishmentService;