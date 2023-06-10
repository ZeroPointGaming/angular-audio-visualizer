import { Component, OnInit, EventEmitter, Output, InjectionToken } from '@angular/core';
import { AudioVisualizationService } from '../audio-visualization.service';

export const COLORS_TOKEN = new InjectionToken<{[key: number]: string}>('colors');

@Component({
  selector: 'app-lighthouse-visualizer',
  templateUrl: './lighthouse-visualizer.component.html',
  styleUrls: ['./lighthouse-visualizer.component.css'],
  providers: [
    { 
      provide: AudioVisualizationService, 
      useFactory: (colors: {[key: number]: string}) => new AudioVisualizationService(colors),
      deps: [COLORS_TOKEN]
    },
    { 
      provide: COLORS_TOKEN, 
      useValue: {
        0: "#cf120e",
        0.5: "#e88215",
        0.8: "#cc00cc",
        1: "#550794"
      }
    }
  ]
})
export class LighthouseVisualizerComponent implements OnInit {
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
