class RatingsMap {
    constructor(id, score, commentary, hiredServiceId) {
        this.setId(id);
        this.score = score,
        this.commentary = commentary,
        this.hiredServiceId = hiredServiceId
    }

    setId(id) {
        if(id != null) {
            this.id = id;
        }
    }
}

module.exports = RatingsMap;