import axios from "axios"

import type { Interceptor } from "../interceptors/types"

export class RequestsModule {
    #api = axios.create({ baseURL: import.meta.env.VITE_DATABASE_BASE_URL })

    constructor(interceptors: Interceptor[] = []) {
        interceptors.forEach(Interceptor => new Interceptor(this.#api).install())
    }

    get api() {
        return this.#api
    }
}