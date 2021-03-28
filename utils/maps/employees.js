class EmployeeMap {
    constructor(id, name, role, address, phone, email, password, establishment){
        this.setId(id);
        this.sub = name;
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.setPassword(password);
        this.establishment = establishment;
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }

    setPassword(password) {
        if(password != null) {
            this.password = password;
        }
    }
}

module.exports = EmployeeMap;