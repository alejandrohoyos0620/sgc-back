const CategoriesMap = require('../utils/maps/categories');
class CategoryService {
    constructor() {
        this.CategoryLib = require('../libraries/categories');
    }

    //method to map all categories in a list
    async mapList(categoriesList) {
        let mappedCategoriesList = [];
        for(let category of categoriesList) {
            mappedCategoriesList.push(new CategoriesMap(
                category.id, 
                category.name, 
                category.establishment_id
                )
            );
        }
        return mappedCategoriesList;
    }

    //method to get an specific category
    async getById(id) {
        let category = await this.CategoryLib.getById(id);
        category = new CategoriesMap(
            category.id, 
            category.name, 
            category.establishment_id
        );
        return category;
    }

    //method to get all categories from an establishment
    async listByEstablishment(establishmentId) {
        let categoriesList = await this.CategoryLib.getByEstablishment(establishmentId);
        return this.mapList(categoriesList); 
    }

    //method to create a category
    async create(params) {
        let createValues = new CategoriesMap(null, params.name, params.establishmentId);  //map category information to a correct object
        let separator = `','`;
        let values = `'${Object.values(createValues).join(separator)}'`;  //join category object values before add it to a query into the library
        const confirm = await this.CategoryLib.create(values);
        return confirm;
    }
    
    //method to update a category
    async update(params) {
        const confirm = await this.CategoryLib.update(params);
        return confirm;
    }

    //method to delete a category
    async delete(id) {
        const confirm = await this.CategoryLib.deleteCategory(id);
        return confirm;
    }
}

module.exports = CategoryService;