const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const CustomerMap = require('../utils/maps/customers');
const EmployeeMap = require('../utils/maps/employees');
const transporter = require('../configuration/mailer');
const passport = require('passport');
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

    async verifyUserExists(email){
        let employee = await this.EmployeeLib.getByEmail(email);
        let customer = await this.CustomerLib.getByEmail(email);
        return customer.concat(employee);
    }

    async sendRecoveryEmail(email, name, codigoRecuperacion){
        try{
            await transporter.sendMail({
                from: '"¿Olvidaste la contraseña?" <sgcproject1@gmail.com>',
                to: email,
                subject: "Recupera tu contraseña",
                html: `
                <div style="background-color: white; text-align:center; border-radius: 10px; width: 500px; margin:auto; padding-bottom:10px; color: black; border: solid 1px grey">
                <h2 style="border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #2196f3; color: white; border-bottom:solid 1px grey; padding: 10px; margin:0">Servicio de recuperación de contraseña SGC</h2>
                <p>Hola <b>${name}!</b> Bienvenido al servicio de recuperación de contraseñas de SGC.</p>
                <p>Has recibido este correo electronico porque realizaste una solicitud para recuperar la contraseña de tu email <b>${email}.</b><p>
                <div style="border-radius: 10px; background-color: #2196f3; color: white; width:60%; margin:auto;">
                <h2 style="margin-bottom: 10px; padding-top: 5px;">Código de recuperación</h2>
                <p style="font-size:15px; color:black; padding-left: 5px; padding-right: 5px"><b>${codigoRecuperacion}</b><p>
                </div>
                <p>Si no realizaste una solicitud para recuperar tu contraseña haz caso omiso a este mensaje.<p>
                <p>Saludos, SGC.</p>
                </div>`
            });
            return 'Email enviado';
        } catch(error){
            return error;
        }
    }

    //method for recover user's password
    async recoverPassword(email){
        let user = await this.verifyUserExists(email);
        if(user.length === 1){
            user = user[0];
            let codigoRecuperacion = crypto.AES.encrypt(email, process.env.AES_KEY).toString();
            return [200, await this.sendRecoveryEmail(email, user.name, codigoRecuperacion)];
        } else {
            return [401, `No se ha encontrado un usuario con el email ${email}`];
        }       
    }

    //method to change an user's password
    async updatePassword(email, code, newPassword){
        if(email === crypto.AES.decrypt(code, process.env.AES_KEY).toString(crypto.enc.Utf8)){
            let password = crypto.AES.encrypt(newPassword, process.env.AES_KEY).toString();
            let user = await this.verifyUserExists(email);
            user = user.length === 1 ? user[0] : null;
            if(user != null){
                let results = user.hasOwnProperty('role') ? 
                await this.EmployeeLib.updatePassword(email, password) : 
                await this.CustomerLib.updatePassword(email, password);
                return [200, results];
            } else {
                return [401, `No existe un usuario para el email ${email}`];
            }

        } else{
            return [401, `El código ingresado es incorrecto`];
        }
    }

}

module.exports = AuthorizationService;