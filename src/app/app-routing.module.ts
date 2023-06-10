import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TronSunsetVisualizerComponent } from './tron-sunset-visualizer/tron-sunset-visualizer.component';
import { StarsVisualizerComponent } from './stars-visualizer/stars-visualizer.component';
import { LighthouseVisualizerComponent } from './lighthouse-visualizer/lighthouse-visualizer.component';
import { MultiImageParallaxVisualizerComponent } from './multi-image-parallax-visualizer/multi-image-parallax-visualizer.component';


const routes: Routes = [
  { path: 'tron', component: TronSunsetVisualizerComponent },
  { path: 'stars', component: StarsVisualizerComponent },
  { path: 'lighthouse', component: LighthouseVisualizerComponent },
  { path: 'multi-image-parallax', component: MultiImageParallaxVisualizerComponent },
  { path: '', redirectTo: '/tron', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] // Export RouterModule
})
export class AppRoutingModule { }
