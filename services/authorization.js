const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const CustomerMap = require('../utils/maps/customers');
const EmployeeMap = require('../utils/maps/employees');
class AuthorizationService {
    constructor(){
        this.CustomerLib = require('../libraries/customers');
        this.EmployeeLib = require('../libraries/employees');
        this.EstablishmentLib = require('../libraries/establishments');
    }

    //method to login an user
    async login(params) {
        //as we don't know if the user is a customer or an employee we search in both tables
        const customerResults = await this.CustomerLib.login(params.email);
        const employeeResults = await this.EmployeeLib.login(params.email);
        let loginResults = customerResults.concat(employeeResults); //join results in a new var
        if(loginResults.length === 0) { //if didn't find the user, return an error message
            return [401, {'message': 'El email o la contraseña es incorrecta, por favor intentalo de nuevo'}];
        }
        else if(loginResults.length === 1) { //if the user exists: 
            if(crypto.AES.decrypt(loginResults[0].password, process.env.AES_KEY).toString(crypto.enc.Utf8) === params.password){ //decrypt user's password with AES_KEY and comparete it with password entry param
                let payload;
                if(loginResults[0].hasOwnProperty('role')) {  //if the user is an employee, use employee map
                    payload = new EmployeeMap(
                        loginResults[0].id, loginResults[0].sub, loginResults[0].role, loginResults[0].address, 
                        loginResults[0].phone_number, loginResults[0].email, null, 
                        await this.EstablishmentLib.getById(loginResults[0].establishment_id)
                    );               
                } else {  //if the user is a customer, use customer map
                    payload = new CustomerMap(
                        loginResults[0].id, loginResults[0].sub, loginResults[0].phone_number, 
                        loginResults[0].city, loginResults[0].address, loginResults[0].email, null
                    );
                }
                const authToken = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);  //Sign the JWT with the user information and JWT_SECRET
                return [200, {token: authToken}];
            } else { //if passwords don't match, return an error message
                return [401, {'message': 'El email o la contraseña es incorrecta, por favor intentalo de nuevo'}];
            }
        }
    }

}

module.exports = AuthorizationService;