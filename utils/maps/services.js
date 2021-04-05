class ServiceMap {
    constructor(id, name, isDeliverable, price, isEnable, description, establishment) {
        this.setId(id);
        this.name = name;
        this.isDeliverable = isDeliverable;
        this.price = price;
        this.isEnable = isEnable;
        this.description = description,
        this.establishment = establishment;
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = ServiceMap;