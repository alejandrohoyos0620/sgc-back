const CategoriesMap = require('../utils/maps/categories');
class CategoryService {
    constructor() {
        this.CategoryLib = require('../libraries/categories');
    }

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

    async getById(id) {
        let category = await this.CategoryLib.getById(id);
        category = new CategoriesMap(
            category.id, 
            category.name, 
            category.establishment_id
        );
        return category;
    }

    async listByEstablishment(establishmentId) {
        let categoriesList = await this.CategoryLib.getByEstablishment(establishmentId);
        return this.mapList(categoriesList);
    }

    async create(params) {
        let createValues = new CategoriesMap(null, params.name, params.establishmentId);
        let separator = `','`;
        let values = `'${Object.values(createValues).join(separator)}'`;
        const confirm = await this.CategoryLib.create(values);
        return confirm;
    }
    
    async update(params) {
        const confirm = await this.CategoryLib.update(params);
        return confirm;
    }

    async delete(id) {
        const confirm = await this.Category.deleteService(id);
        return confirm;
    }
}

module.exports = CategoryService;