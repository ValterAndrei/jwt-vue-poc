import { AuthModule } from "./modules/auth-module";
import { RequestsModule } from "./modules/requests-module";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { HttpService } from "./http-service";

const authModule = new AuthModule([AuthInterceptor]);
const requestsModule = new RequestsModule([AuthInterceptor]);

const httpService = new HttpService({ auth: authModule, requests: requestsModule });

export { httpService }