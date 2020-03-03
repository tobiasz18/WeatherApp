import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather;
    img;
    constructor(private api: WeatherService) { }

    ngOnInit() {
        this.getLocation()
    }

    
    getLocation() {
        if (!navigator.geolocation) {
            console.log('No support for geolocation')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            this.api.sendGETRequestByGeoCoords(longitude, latitude).subscribe((data: any) => {
              //  this.weather = data;
             //   console.log(data)
               
                this.weather = data;
                this.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            
            })
        });
    }

    getByCityName(city) {
        console.log('test', city.value)
        this.api.sendGETRequestByCityName(city.value).subscribe((data: any) => {
            this.weather = data;
            this.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            
        })
    }

}


