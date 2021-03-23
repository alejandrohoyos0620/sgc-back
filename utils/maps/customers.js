class CustomerMap {
    constructor(name, phone, city, address, email, password){
        this.sub = name;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.email = email;
        this.setPassword(password);
    }

    setPassword(password) {
        if(password != null) {
            this.password = password;
        }
    }
}

module.exports = CustomerMap;