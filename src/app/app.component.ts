import { Component, OnInit } from '@angular/core';
import { AudioVisualizationService } from './audio-visualization.service';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'audio-visualizer';
  private audio!: HTMLMediaElement;

  constructor(private audioVisualizationService: AudioVisualizationService) {}

  ngOnInit() {
    this.audio = this.audioVisualizationService.visualizeAudio();
  }

  ngAfterViewInit() {
    $('#startBtn').on('click', () => {
      this.play();
      $('#startBtn').hide();
    });
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