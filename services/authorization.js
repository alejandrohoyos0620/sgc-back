const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const CustomerMap = require('../utils/maps/customers');
const EmployeeMap = require('../utils/maps/employees');
class AuthorizationService {
    constructor(){
        this.CustomerLib = require('../libraries/customers');
        this.EmployeeLib = require('../libraries/employees');
    }
    async login(params) {
        const customerResults = await this.CustomerLib.login(params.email);
        const employeeResults = await this.EmployeeLib.login(params.email);
        let loginResults = customerResults.concat(employeeResults);
        if(loginResults.length === 0) {
            return [401, {'message': 'El email o la contraseña es incorrecta, por favor intentalo de nuevo'}];
        }
        else if(loginResults.length === 1) {
            if(crypto.AES.decrypt(loginResults[0].password, process.env.AES_KEY).toString(crypto.enc.Utf8) === params.password){
                let payload;
                if(loginResults[0].hasOwnProperty('role')) {
                    payload = new EmployeeMap(loginResults[0].id, loginResults[0].sub, loginResults[0].role, loginResults[0].address, loginResults[0].phone_number, loginResults[0].email, null, loginResults[0].establishment_nit);
                
                } else {
                    payload = new CustomerMap(loginResults[0].id, loginResults[0].sub, loginResults[0].phone_number, loginResults[0].city, loginResults[0].address, loginResults[0].email, null);
                }
                const authToken = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
                return [200, {token: authToken}];
            } else {
                return [401, {'message': 'El email o la contraseña es incorrecta, por favor intentalo de nuevo'}];
            }
        }
    }

}

module.exports = AuthorizationService;