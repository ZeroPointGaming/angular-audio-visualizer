import { Component, OnInit, EventEmitter, Output, InjectionToken } from '@angular/core';
import { AudioVisualizationService } from '../audio-visualization.service';

export const COLORS_TOKEN = new InjectionToken<{[key: number]: string}>('colors');

@Component({
  selector: 'app-stars-visualizer',
  templateUrl: './stars-visualizer.component.html',
  styleUrls: ['./stars-visualizer.component.css'],
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
export class StarsVisualizerComponent {
  public audio!: HTMLMediaElement;
  @Output() playEvent: EventEmitter<void> = new EventEmitter<void>();;

  constructor(private audioVisualizationService: AudioVisualizationService) { }

  stars: { top: number; left: number; delay: number }[] = [];

  generateStars() {
    const numStars = 100; // Adjust the number of stars as desired

    for (let i = 0; i < numStars; i++) {
      const top = Math.floor(Math.random() * window.innerHeight);
      const left = Math.floor(Math.random() * window.innerWidth);
      const delay = Math.random() * 10; // Adjust the range as per your preference
      this.stars.push({ top, left, delay });
    }
  }

  ngOnInit() {
    this.audio = this.audioVisualizationService.visualizeAudio();
    this.generateStars();
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