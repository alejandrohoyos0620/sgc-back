class EmployeeMap {
    constructor(name, role, address, phone, email, password, establishmentNit){
        this.fullName = name;
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.setPassword(password);
        this.establishmentNit = establishmentNit;
    }
    
    setPassword(password) {
        if(password != null) {
            this.password = password;
        }
    }
}

module.exports = EmployeeMap;