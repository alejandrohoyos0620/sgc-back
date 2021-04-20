const DeviceMap = require('../utils/maps/devices');
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

    async create(deviceParams) {
        let values = new DeviceMap(
            null, 
            deviceParams.name,  
            deviceParams.brand,  
            deviceParams.code,  
            deviceParams.color
        );
        values = values.join(',');
        return await this.DeviceLib.create(values);
    }

    async listByOwner(ownerId) {
        let devicesList = await this.DeviceLib.getByOwner(ownerId);
        return this.mapList(devicesList);
    }
}


module.exports = DeviceService;