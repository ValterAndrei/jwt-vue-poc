import type { AuthModule } from "./modules/auth-module";
import type { RequestsModule } from "./modules/requests-module";

type ConstructoProps = {
    auth: AuthModule;
    requests: RequestsModule;
}

export class HttpService {
    auth: AuthModule;
    requests: RequestsModule;

    constructor({ auth, requests }: ConstructoProps) {
        this.auth = auth
        this.requests = requests
    }
}