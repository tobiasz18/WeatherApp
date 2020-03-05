import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    keyApi = '148ab12495a9f1a901fe6056090a7487';
    kepApi2 = 'a42dd92cab5f40c49a0b67f304d63cc4';

    constructor(private httpClient: HttpClient) { }
    //lon, lat
    sendGETRequestByGeoCoords(log, lat, url:string) {
        let params = new HttpParams();
        params = params.append('lon', log);
        params = params.append('lat', lat);
        params = params.append('units', 'metric');
        params = params.append('appid', this.keyApi);

        return this.httpClient.get(url, { params: params });
    }

    sendGETRequestByCityName(city: string ,url:string) {
        let params = new HttpParams();
        params = params.append('q', city);
        params = params.append('units', 'metric');
        params = params.append('appid', this.keyApi);

        return this.httpClient.get(url, { params: params });
    }

    sendGETRequest16Days(city: string ,url:string) {
        let params = new HttpParams();
        params = params.append('city', city);
        params = params.append('days', '6');
        params = params.append('key', this.kepApi2); 

        return this.httpClient.get(url, { params: params });
    }
}


