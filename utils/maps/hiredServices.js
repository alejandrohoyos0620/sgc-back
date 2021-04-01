class HiredServiceMap {
    constructor(id, customer, repairman, service, device, status, createdAt, description, hour, date) {
        this.id = id,
        this.customer = customer,
        this.repairman = repairman,
        this.service = service,
        this.device = device,
        this.status = status,
        this.createdAt = createdAt,
        this.description = description,
        this.hour = hour,
        this.date = date
    }
}

module.exports = HiredServiceMap;