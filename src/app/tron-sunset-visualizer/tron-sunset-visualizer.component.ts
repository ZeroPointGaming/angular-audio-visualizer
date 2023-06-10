import { Component, OnInit, EventEmitter, Output, InjectionToken } from '@angular/core';
import { AudioVisualizationService } from '../audio-visualization.service';

import * as $ from 'jquery';

export const COLORS_TOKEN = new InjectionToken<{[key: number]: string}>('colors');

@Component({
  selector: 'app-tron-sunset-visualizer',
  templateUrl: './tron-sunset-visualizer.component.html',
  styleUrls: ['./tron-sunset-visualizer.component.css'],
  providers: [
    { 
      provide: AudioVisualizationService, 
      useFactory: (colors: {[key: number]: string}) => new AudioVisualizationService(colors),
      deps: [COLORS_TOKEN]
    },
    { 
      provide: COLORS_TOKEN, 
      useValue: {
        0: "#005eff",
        0.5: "#ff68ff",
        0.8: "#cc00cc",
        1: "#ffff00"
      }
    }
  ]
})
export class TronSunsetVisualizerComponent implements OnInit {
  public audio!: HTMLMediaElement;
  @Output() playEvent: EventEmitter<void> = new EventEmitter<void>();;

  constructor(private audioVisualizationService: AudioVisualizationService) { }

  ngOnInit() {
    this.audio = this.audioVisualizationService.visualizeAudio();
  }

  play() {
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }
}
