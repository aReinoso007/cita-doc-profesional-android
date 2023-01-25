import { environment } from 'src/environments/environment';
import { InjectorInstance } from './../utils/utils.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ApplicationServiceBase {
    protected http: HttpClient;
    protected apiBackendSite: string;


    constructor() {
        this.http = InjectorInstance.get<HttpClient>(HttpClient);
        this.intiliazeVariables();
    }

    private intiliazeVariables() {
        this.apiBackendSite = this.buildAPIURL(environment['apiBackend']);
    }

    private buildAPIURL(endPoint: any) {
        return endPoint.protocol + '://' + endPoint.host + (endPoint.port != '' ? ':' + endPoint.port : '') + '/api';
    }

}
