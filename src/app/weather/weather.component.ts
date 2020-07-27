import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    urlData: string = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather data
    urlHourlyData: string = 'https://api.openweathermap.org/data/2.5/forecast?';
    url16Days: string = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // daily weather on 16 days but with limit on 6
    weather: any;
    weeklyWeather: object;
    currentCity: string; 
    currentCityGeo: string;
    min: number;
    max: number;
    formatTemp: string;
    tempFormatWeekly: string;
    flagLocation: boolean = true;
    locationDeined: boolean = true;

    constructor(private api: WeatherService) { }

    ngOnInit() {
        this.formatTemp = 'metric';
       
    }

    getLocation() {
        if (!navigator.geolocation) {
            console.log('No support for geolocation')
            alert('Geolocation is blocked in this browser.')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            this.api.sendGETRequestByGeoCoords(longitude, latitude, this.urlData, this.formatTemp).subscribe((data: any) => {
                this.weather = data;
                this.currentCity = data.name; 
                this.getByCityName5Days(data.name);
                this.flagLocation = true;
                this.currentCityGeo = data.name;
            });
        }, error => {
            if (error.message === "User denied Geolocation") {
                console.log('User denied Geolocation');
                alert('Geolocation is blocked in this browser.')
                this.locationDeined = false;
            }
        });
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlData, this.formatTemp).subscribe((data: any) => {
            this.weather = data;
        });
        this.currentCity = city;   
        this.getByCityName5Days(city);
        this.flagLocation = false;
    }

    getByCityName5Days(city) {
        if(this.formatTemp === 'metric') {
            this.tempFormatWeekly = 'M'
        } else {
            this.tempFormatWeekly = 'I'
        }
        this.api.sendGETRequest16Days(city, this.url16Days, this.tempFormatWeekly).subscribe((data: any) => {
            this.weeklyWeather = data.data.slice(1);
            this.min = data.data[0].min_temp.toFixed(0);
            this.max = data.data[0].max_temp.toFixed(0);
        });
    }

    changeFormat(format) {
        this.formatTemp = format;
        this.api.sendGETRequestByCityName(this.currentCity, this.urlData, this.formatTemp).subscribe((data: any) => {
            this.weather = data;
        });  
        this.getByCityName5Days(this.currentCity);      
    }
}


