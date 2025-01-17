import { type AxiosInstance } from 'axios';

import { useToken } from '../../../composables/use-token';
import { CONFIG } from '../../../utils/config';

const [authToken, authTokenExpired] = useToken(CONFIG.AUTH_TOKEN_STORAGE_KEY);

export class AuthInterceptor {
    constructor(private axiosInstance: AxiosInstance) { }

    install() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                if (authToken.value) {
                    config.headers.Authorization = `Bearer ${authToken.value}`;
                }

                return config;
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    authToken.value = null;
                    authTokenExpired.value = true
                }

                return Promise.reject(error);
            }
        )
    }
}