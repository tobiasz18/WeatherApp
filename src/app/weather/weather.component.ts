import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'
import { LineChartComponent } from './line-chart/line-chart.component';


@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    urlData = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather data
    urlHourlyData = 'https://api.openweathermap.org/data/2.5/forecast?'; 
    url16Days = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // daily weather on 16 days but with limit on 6
    weather;
    img;
    currentCity; // variable for child component (line-chart)
    sunrise;
    sunset;
    weeklyWeather;
    currentWeather;
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
                console.log("DATA", data)
                this.currentCity = data.name; // for child component
                this.getByCityName5Days(data.name);
            })
        });
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlData).subscribe((data: any) => {
            this.weather = data;
            this.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        this.currentCity = city; // for child component    
        this.getByCityName5Days(city) 
    }


    getByCityName5Days(city) {
        this.api.sendGETRequest16Days(city, this.url16Days).subscribe((data: any) => {
            console.log('data from another zrodła', data)
            this.weeklyWeather = data.data.slice(1);
            this.currentWeather = data.data[0]
            console.log(data, 'sss', this.currentWeather)
        })

    }

}


