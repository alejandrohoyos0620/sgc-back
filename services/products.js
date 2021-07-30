const { number } = require('joi');
const ProductsMap = require('../utils/maps/products');
const PAGE_SIZE = 9;

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

    async getNumberOfPages(source, id){
        let numberOfRecords = await this.ProductLib.countRecordsInFilter(source, id);
        let numberOfPages = Math.ceil(numberOfRecords[0].records / PAGE_SIZE);
        return numberOfPages;
    }

    setPaginationLimit(page){
        let pageLimit = 0;
        if(page === null){
            page = 1;
        }
        pageLimit = ((page - 1) * PAGE_SIZE);
        return pageLimit;
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

    //method to get all enabled products from an establishment
    async listEnabledByEstablishment(establishmentId, page) {
        const numberOfPages = await this.getNumberOfPages('establishment_id', establishmentId);
        const pageLimit = this.setPaginationLimit(page);
        let productsList = await this.ProductLib.getEnabledByFilter('establishment_id', establishmentId, pageLimit, PAGE_SIZE);
        return {
            numberOfPages: numberOfPages,
            products: await this.mapList(productsList)
        }; 
    }

    //method to get all products from a category
    async listByCategory(establishmentId) {
        let productsList = await this.ProductLib.getByCategory(establishmentId);
        return this.mapList(productsList);
    }

    //method to get all enabled products from a category
    async listEnabledByCategory(categoryId, page) {
        const numberOfPages = await this.getNumberOfPages('category_id', categoryId);
        const pageLimit = this.setPaginationLimit(page);
        let productsList = await this.ProductLib.getEnabledByFilter('category_id', categoryId, pageLimit, PAGE_SIZE);
        return {
            numberOfPages: numberOfPages,
            products: await this.mapList(productsList)
        }; 
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