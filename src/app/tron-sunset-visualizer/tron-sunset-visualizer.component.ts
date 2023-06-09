import { Component, OnInit } from '@angular/core';
import { AudioVisualizationService } from '../audio-visualization.service';

@Component({
  selector: 'app-tron-sunset-visualizer',
  templateUrl: './tron-sunset-visualizer.component.html',
  styleUrls: ['./tron-sunset-visualizer.component.css']
})
export class TronSunsetVisualizerComponent {

  constructor(private audioVisualizationService: AudioVisualizationService) { }

  ngOnInit() {
    this.audioVisualizationService.visualizeAudio();
  }

}
