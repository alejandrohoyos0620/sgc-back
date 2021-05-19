const DeviceMap = require('../utils/maps/devices');
const DevicesMap = require('../utils/maps/devices');
class DeviceService {
    constructor() {
        this.DeviceLib = require('../libraries/devices');
    }

    //method to map all devices in a list
    async mapList(devicesList) {
        let mappedDevicesList = [];
        for(let device of devicesList) {
            mappedDevicesList.push(new DevicesMap(
                device.id, 
                device.name, 
                device.brand,
                device.code,
                device.color, 
                device.owner,
                )
            );
        }
        return mappedDevicesList;
    }

    //method to get an specific device
    async getById(id) {
        let device = await this.DeviceLib.getById(id);
        device = new DevicesMap(device.id, device.name, device.brand, device.code, device.color, device.owner);
        return device;
    }

    //method to create a device
    async create(deviceParams) {
        let values = new DeviceMap(  //map category information to a correct object
            null, 
            deviceParams.name,  
            deviceParams.brand,  
            deviceParams.code,  
            deviceParams.color,
            deviceParams.ownerId
        );
        let separator = `','`;
        values = `'${Object.values(values).join(separator)}'`;  //join device's object values before add it to a query into the library
        return await this.DeviceLib.create(values);
    }


    //method to get all devices of an owner/customer
    async listByOwner(ownerId) {
        let devicesList = await this.DeviceLib.getByOwner(ownerId);
        return this.mapList(devicesList);
    }
}


module.exports = DeviceService;