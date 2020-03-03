import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { LineChartComponent } from './weather/line-chart/line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
