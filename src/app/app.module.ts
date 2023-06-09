import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { ApiServiceComponent } from './api-service/api-service.component';
import { LighthouseVisualizerComponent } from './lighthouse-visualizer/lighthouse-visualizer.component';
import { TronSunsetVisualizerComponent } from './tron-sunset-visualizer/tron-sunset-visualizer.component';
import { StarsVisualizerComponent } from './stars-visualizer/stars-visualizer.component';
import { MultiImageParallaxVisualizerComponent } from './multi-image-parallax-visualizer/multi-image-parallax-visualizer.component';
import { AudioVisualizationService } from './audio-visualization.service';
import { ControlMenuComponent } from './control-menu/control-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiServiceComponent,
    LighthouseVisualizerComponent,
    TronSunsetVisualizerComponent,
    StarsVisualizerComponent,
    MultiImageParallaxVisualizerComponent,
    ControlMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AudioVisualizationService,
    { provide: '$', useValue: $ },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
