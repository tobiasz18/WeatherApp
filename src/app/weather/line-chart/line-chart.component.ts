import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { WeatherService } from '../../weather.service';



@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {
    @Input() childFn: string

    urlHourlyData = 'https://api.openweathermap.org/data/2.5/forecast?';  // Hourly forecast
    WeatherHourlu;
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

    @Input('city') cityName: string;

    constructor(private api: WeatherService) {}
    
    ngOnInit() {}

    ngOnChanges(e) {
        console.log('currentValue', e)
        this.getByCityNames(e.cityName.currentValue)
    }

    getByCityNames(city) {
        this.api.sendGETRequestByCityName(city, this.urlHourlyData).subscribe((data: any) => {
            this.WeatherHourlu = data.list;

            let Labels = []
            let ChartData = []
            for (let i = 0; i < 6; i++) {
                let d = new Date(data.list[i].dt * 1000);    
                let h = this.addZero(d.getUTCHours());
                let m = this.addZero(d.getUTCMinutes());

                let template = [h + ":" + m ];     
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

