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

    resetFlags() {
        this.flags = {};
    }

}

module.exports = new Config();
