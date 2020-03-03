import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { WeatherService } from '../../weather.service';


@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {
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
        //   this.getByCityName('Paris')
        this.getByCityName('Paris')
    }

    ngDoCheck() {

    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlHourlyData).subscribe((data: any) => {
            this.WeatherHourlu = data.list;
            // this.img = `http://openweathermap.org/img/wn/${data[0].icon}@2x.png`;

            console.log(this.WeatherHourlu);
            let x = []
            for (let i = 0; i < 6; i++) {


                x = [...x, data.list[i].dt]

                //.toString().slice(4, 6)
                console.log('xv', x)
            }
            this.barChartData = [{ data: x, label: 'Series A' }];
            console.log(this.barChartData)


        })


    }
    /*
        chartData = [
            { data: [330, 600, 260, 700], label: 'Account A' },
            { data: [120, 455, 100, 340], label: 'Account B' },
            { data: [45, 67, 800, 500], label: 'Account C' }
        ];
    
        chartLabels = ['January', 'February', 'Mars', 'April'];
    
    */


    public barChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
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