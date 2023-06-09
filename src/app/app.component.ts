import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { AudioVisualizationService } from './audio-visualization.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'audio-visualizer';
  public audio!: HTMLMediaElement;
  @Output() playEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private audioVisualizationService: AudioVisualizationService) {}

  ngOnInit() {
    this.audio = this.audioVisualizationService.visualizeAudio();
  }

  ngAfterViewInit() {
    //$('#controlMenuModal').modal('show');
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