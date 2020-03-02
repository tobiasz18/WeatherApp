import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather;
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

            this.api.sendGETRequestWithParameters(longitude, latitude).subscribe((data) => {
              //  this.weather = data;
             //   console.log(data)
               
                this.weather = {...data}
                console.log(data)
            })
        });
    }
}


