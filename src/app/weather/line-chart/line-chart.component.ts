import { Component, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { WeatherService } from '../../weather.service';


@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit{
    urlData = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather data
    urlHourlyData = 'https://api.openweathermap.org/data/2.5/forecast?';  // Hourly forecast
   // weather;
    WeatherHourlu;
    img;
    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor(private api: WeatherService) { }

    ngOnInit() {
        this.getByCityName('Paris')
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlHourlyData).subscribe((data: any) => {
            this.WeatherHourlu = data;
           // this.img = `http://openweathermap.org/img/wn/${data[0].icon}@2x.png`;

            console.log(this.WeatherHourlu)
        })
    }


    lineChartData: ChartDataSets[] = [
        { data: [13, 14, 15, 18, 14, -3], label: 'Crude oil prices' },
    ];

    lineChartLabels: Label[] = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    lineChartOptions = {
        responsive: true,
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                font: {
                    size: 20,
                }
            }
        }
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: '',
        },
    ];



}