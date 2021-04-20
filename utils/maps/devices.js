class DeviceMap {
    constructor(id, name, brand, code, color) {
        this.setId(id);
        this.name = name;
        this.brand = brand;
        this.code = code;
        this. color = color;
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = DeviceMap;