import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    url: string;

    constructor(private httpClient: HttpClient) { }
    //lon, lat
    sendGETRequestWithParameters(log, lat) {
        let url = 'https://api.openweathermap.org/data/2.5/weather';
        let keyApi = '148ab12495a9f1a901fe6056090a7487';

        let params = new HttpParams();
        params = params.append('lon', log);
        params = params.append('lat', lat);
        params = params.append('appid', keyApi);

        return this.httpClient.get<PersonData>(url, { params: params });
    }

 

}

 interface PersonData {
    name?: string;
}
