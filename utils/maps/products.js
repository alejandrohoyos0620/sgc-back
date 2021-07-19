class ProductsMap {
    constructor(id, name, establishmentId) {
        this.setId(id);
        this.name = name;
        this.categoryId = categoryId;
        this.price = price;
        this.brand = brand;
        this.image = image;
        this.description = description;
        this.code = code;
        this.color = color;
        this.establishmentId = establishmentId;
        this.isEnable = isEnable
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = ProductsMap;