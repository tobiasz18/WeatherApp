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
    barChartData = [
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

    constructor(private api: WeatherService) { }

    ngOnInit() {
        //   this.getByCityName('Paris')
        this.getByCityName('Potok górny')
    }

    getByCityName(city) {
        this.api.sendGETRequestByCityName(city, this.urlHourlyData).subscribe((data: any) => {
            this.WeatherHourlu = data.list;
            // this.img = `http://openweathermap.org/img/wn/${data[0].icon}@2x.png`;

            console.log(this.WeatherHourlu);
            let Labels = []
            let ChartData = []
            for (let i = 0; i < 6; i++) {
                var d = new Date(data.list[i].dt * 1000);    
                var h = this.addZero(d.getUTCHours());
                var m = this.addZero(d.getUTCMinutes());

                var template = [h + ":" + m ];     
                let degreesTemplate = data.list[i].main.temp.toFixed(0);

                Labels = [...Labels, ...template];

                ChartData = [...ChartData, degreesTemplate ]
            }
            this.barChartData = [{ data: ChartData, label: 'Series A' }];
            this.lineChartLabels = [...Labels];
        })
    }


     addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

}

