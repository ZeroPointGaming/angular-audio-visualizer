import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import * as $ from 'jquery';
import { ApiServiceComponent } from './api-service/api-service.component';
import { LighthouseVisualizerComponent } from './lighthouse-visualizer/lighthouse-visualizer.component';
import { TronSunsetVisualizerComponent } from './tron-sunset-visualizer/tron-sunset-visualizer.component';
import { StarsVisualizerComponent } from './stars-visualizer/stars-visualizer.component';
import { MultiImageParallaxVisualizerComponent } from './multi-image-parallax-visualizer/multi-image-parallax-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiServiceComponent,
    LighthouseVisualizerComponent,
    TronSunsetVisualizerComponent,
    StarsVisualizerComponent,
    MultiImageParallaxVisualizerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
