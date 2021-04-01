class ServiceMap {
    constructor(id, name, isDeliverable, isEnable, description, establishment) {
        this.id = id;
        this.name = name;
        this.isDeliverable = isDeliverable;
        this.isEnable = isEnable;
        this.description = description,
        this.establishment = establishment;
    }
}

module.exports = ServiceMap;