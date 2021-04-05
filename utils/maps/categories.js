class CategoryMap {
    constructor(id, name, establishmentId) {
        this.setId(id);
        this.name = name;
        this.establishmentId = establishmentId;
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = CategoryMap;