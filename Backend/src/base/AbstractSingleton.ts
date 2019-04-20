export default class AbstractSingleton {
    private static _instance: AbstractSingleton;
    private constructor() {};

    public static get Instance() {
        if(!this._instance)
            this._instance = new this();

        return this._instance
    }

}