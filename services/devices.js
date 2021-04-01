const DevicesMap = require('../utils/maps/devices');
class DeviceService {
    constructor() {
        this.DeviceLib = require('../libraries/devices');
    }

    async getById(id) {
        let device = await this.DeviceLib.getById(id);
        device = new DevicesMap(device.id, device.name, device.brand, device.code, device.color);
        return device;
    }
}

module.exports = DeviceService;