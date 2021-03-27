class CustomerMap {
    constructor(id, name, phone, city, address, email, password){
        this.setId(id);
        this.sub = name;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.email = email;
        this.setPassword(password);
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

module.exports = CustomerMap;