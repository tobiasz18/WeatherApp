import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'


@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    urlData = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather data
    urlHourlyData = 'https://api.openweathermap.org/data/2.5/forecast?';
    url16Days = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // daily weather on 16 days but with limit on 6
    weather: any;
    currentCity; // variable for child component (line-chart)
    sunrise;
    sunset;
    weeklyWeather;
    min;
    max;
    fakeZero;
    flagLocation;
    locationDeined: boolean = true;
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
                this.currentCity = data.name; // for child component
                this.getByCityName5Days(data.name);
                this.flagLocation = true;
            })
        }, error => {
            if (error.message === "User denied Geolocation") {
                console.log('User denied Geolocation');
                this.locationDeined = false;
            }
        });
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlData).subscribe((data: any) => {
            this.weather = data;
        })
        this.currentCity = city; // for child component    
        this.getByCityName5Days(city);
        this.flagLocation = false;
    }

    getByCityName5Days(city) {
        this.api.sendGETRequest16Days(city, this.url16Days).subscribe((data: any) => {
            this.weeklyWeather = data.data.slice(1);

            this.min = data.data[0].min_temp.toFixed(0);
            this.max = data.data[0].max_temp.toFixed(0);
        })
    }
}


