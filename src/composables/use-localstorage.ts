import { reactive, watch } from "vue"

const store = reactive<Record<string, string | null>>({})

export function useLocalstorage<T extends string>(key: string, initialValue?: string) {
    store[key] = localStorage.getItem(key)

    watch(() => store[key], (newValue) => {
        newValue === null ? localStorage.removeItem(key) : localStorage.setItem(key, newValue)
    })

    if (initialValue) store[key] = initialValue

    return {
        get value() {
            return store[key] as T | null
        },

        set value(value: T | null) {
            store[key] = value
        }
    }
}