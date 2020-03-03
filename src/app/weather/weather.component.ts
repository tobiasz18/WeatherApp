import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    urlData = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather data
    urlHourlyData = 'pro.openweathermap.org/data/2.5/forecast/hourly';  // Hourly forecast
    weather;
    WeatherHourlu;
    img;
    constructor(private api: WeatherService) { }

    ngOnInit() {
        this.getLocation();
    }

    getLocation() {
        if (!navigator.geolocation) {
            console.log('No support for geolocation')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            this.api.sendGETRequestByGeoCoords(longitude, latitude, this.urlData).subscribe((data: any) => {
                this.weather = data;
                this.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            })
        });
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city.value, this.urlData).subscribe((data: any) => {
            this.weather = data;
            this.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
    }

 

}


