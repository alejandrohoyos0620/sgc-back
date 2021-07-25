const RatingsMap = require('../utils/maps/ratings');
class RatingService {
    constructor() {
        this.RatingLib = require('../libraries/ratings');
    }

    //method to get an specific rating
    async getByHiredService(id) {
        let rating = await this.RatingLib.getByHiredService(id);
        if(rating){
            rating = new RatingsMap(
                rating.id, 
                rating.score, 
                rating.commentary,
                rating.hired_service_id
            );
        return rating;
        }
    }

    //method to create a rating
    async create(params) {
        let createValues = new RatingsMap(null, params.score, params.commentary ? params.commentary : null, params.hiredServiceId);  //map rating information to a correct object
        let separator = `','`;
        let values = `'${Object.values(createValues).join(separator)}'`;  //join rating object values before add it to a query into the library
        const confirm = await this.RatingLib.create(values);
        return confirm;
    }
}

module.exports = RatingService;