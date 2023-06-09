import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LighthouseVisualizerComponent } from './lighthouse-visualizer.component';

describe('LighthouseVisualizerComponent', () => {
  let component: LighthouseVisualizerComponent;
  let fixture: ComponentFixture<LighthouseVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LighthouseVisualizerComponent]
    });
    fixture = TestBed.createComponent(LighthouseVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
