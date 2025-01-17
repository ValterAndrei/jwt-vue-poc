import { reactive, watch } from "vue";
import { useLocalstorage } from "./use-localstorage";

type Store = {
    [key: string]: {
        token: ReturnType<typeof useLocalstorage>,
        expired: boolean
    }
}

const store = reactive<Store>({})

export function useToken(storageKey: string) {
    store[storageKey] = { token: useLocalstorage(storageKey), expired: false }

    watch(
        () => store[storageKey]?.token.value,
        (newValue) => {
            if (newValue) store[storageKey].expired = false
        }
    )

    const expiredReturn = {
        get value() {
            return store[storageKey]?.expired
        },

        set value(value: boolean) {
            if (store[storageKey]) {
                store[storageKey].expired = value;
            }
        }
    }

    return [store[storageKey]?.token, expiredReturn] as const
}