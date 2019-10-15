class Config {
    constructor() {
        this.flags = {};
    }

    addFlags(flags) {
        this.flags = {
            ...this.flags,
            ...flags,
        };
    }

}

module.exports = new Config();
