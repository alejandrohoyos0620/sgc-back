class EstablishmentMap {
    constructor(id, nit, name, address, city, phone, email, openingTime, closingTime) {
        this.setId(id);
        this.nit = nit;
        this.name = name;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = EstablishmentMap;