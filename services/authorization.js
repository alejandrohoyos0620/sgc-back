const jwt = require('jsonwebtoken');
class AuthorizationService {
    constructor(){
        this.CustomerLib = require('../libraries/customers');
        this.EmployeeLib = require('../libraries/employees');
    }
    async login(params) {
        const customerResults = await this.CustomerLib.login(params);
        const employeeResults = await this.EmployeeLib.login(params);
        let loginResults = customerResults.concat(employeeResults);
        if(loginResults.length === 0) {
            return [401, {'message': 'El email o la contraseña es incorrecta, por favor intentalo de nuevo'}];
        }
        else if(loginResults.length === 1) {
            if(!loginResults[0].hasOwnProperty('role')) {
                loginResults[0].role = 'customer';
            }
            const secret = loginResults[0].token_confirm;
            delete loginResults[0].token_confirm;
            const payload = {
                sub: loginResults[0].sub, 
                email: loginResults[0].email, 
                address: loginResults[0].address, 
                role: loginResults[0].role
            };
            const authToken = jwt.sign(payload, secret);
            return [200, {token: authToken}];
        }
    }

}

module.exports = AuthorizationService;