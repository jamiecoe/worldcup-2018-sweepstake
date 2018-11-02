export class SuccessState {
    constructor(data) {
        this.data = data
    }

    getState() {
        return this.data
    }

    static isSuccess(obj) {
        return obj instanceof SuccessState
    }
}
