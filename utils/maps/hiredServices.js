class HiredServiceMap {
    constructor(id, customer, repairman, service, device, status, createdAt, description, hour, date, type) {
        this.setId(id);
        this.customer = customer,
        this.setRepairman(repairman),
        this.service = service,
        this.device = device,
        this.status = status,
        this.setCreatedAt(createdAt),
        this.description = description,
        this.setHour(hour),
        this.setDate(date),
        this.type = type
    }
    
    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }

    setRepairman(repairman) {
        if(repairman != null) {
            this.repairman = repairman;
        }
    }

    setCreatedAt(createdAt) {
        if(createdAt != null) {
            this.createdAt = createdAt;
        }
    }

    setHour(hour) {
        if(hour != null) {
            this.hour = hour;
        }
    }

    setDate(date) {
        if(date != null) {
            this.date = date;
        }
    }
}

module.exports = HiredServiceMap;