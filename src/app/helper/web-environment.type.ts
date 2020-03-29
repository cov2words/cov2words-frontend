import {Injectable} from '@angular/core';
import {IApplicationEnvironment} from "../extlib/originstamp-client-js/originstamp_client_js/config/application-environment.interface";
import {NotImplementedError} from "../extlib/originstamp-client-js/originstamp_client_js/error_handling/not_implemented_error.type";
import {Configuration} from "../extlib/originstamp-client-js/originstamp_client_js/config/config.type";
import {ENV} from "../../environments/environment.prod";

@Injectable()
export class WebEnvironment implements IApplicationEnvironment {

    constructor() {
    }

    ////////

    public getEnterpriseConfiguration(): Configuration {
        throw new NotImplementedError();
    }

    public getSystemConfiguration(): Configuration {
        let config = new Configuration(ENV.cov2words.apiBaseUrl);
        config.setHeaders();
        return config;
    }

    public get monitoringDebounceInterval(): number {
        throw new NotImplementedError();
    }

    public get environmentConfiguration(): string {
        return ENV.description;
    }

    public get environmentVersion(): string {
        return ENV.version;
    }

    public get recaptchaApiKey(): string {
        throw new NotImplementedError();
    }

    public get activeCurrencyIds(): number[] {
        throw new NotImplementedError();
    }

    public get isProduction(): boolean {
        return ENV.production;
    }

    public get navStackItems(): any {
        throw new NotImplementedError();
    }

    public get appId(): string {
        return ENV.appId;
    }

}
