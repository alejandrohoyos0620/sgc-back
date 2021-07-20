const ProductsMap = require('../utils/maps/products');
class ProductService {
    constructor() {
        this.ProductLib = require('../libraries/products');
    }

    //method to map all products in a list
    async mapList(productsList) {
        let mappedProductsList = [];
        for(let product of productsList) {
            mappedProductsList.push(new ProductsMap(
                product.id, 
                product.name, 
                product.category_id,
                product.price,
                product.brand,
                product.image,
                product.description,
                product.code,
                product.color,
                product.establishment_id,
                product.is_enable
                )
            );
        }
        return mappedProductsList;
    }

    //method to get an specific product
    async getById(id) {
        let product = await this.ProductLib.getById(id);
        product = new ProductsMap(
            product.id, 
            product.name, 
            product.category_id,
            product.price,
            product.brand,
            product.image,
            product.description,
            product.code,
            product.color,
            product.establishment_id,
            product.is_enable
        );
        return product;
    }

    //method to get all products from an establishment
    async listByEstablishment(establishmentId) {
        let productsList = await this.ProductLib.getByEstablishment(establishmentId);
        return this.mapList(productsList); 
    }

    //method to get all products from a category
    async listByCategory(establishmentId) {
        let productsList = await this.ProductLib.getByCategory(establishmentId);
        return this.mapList(productsList);
    }

    //method to create a product
    async create(params) {
        let createValues = new ProductsMap(   //map product information to a correct object
            null, 
            params.name,
            params.categoryId,
            params.price,
            params.brand,
            params. image,
            params.description,
            params.code,
            params.color,
            params.establishmentId,
            params.isEnable
            );  
        let separator = `','`;
        let values = `'${Object.values(createValues).join(separator)}'`;  //join product object values before add it to a query into the library
        const confirm = await this.ProductLib.create(values);
        return confirm;
    }
    
    //method to update a product
    async update(params) {
        const confirm = await this.ProductLib.update(params);
        return confirm;
    }

    //method to delete a product
    async delete(id) {
        const confirm = await this.ProductLib.deleteProduct(id);
        return confirm;
    }
}

module.exports = ProductService;