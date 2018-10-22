export class ErrorState {
    constructor(data) {
        this.error = data
    }

    getState() {
        return this.error
    }

    static isError(obj) {
        return obj instanceof this
    }
}
