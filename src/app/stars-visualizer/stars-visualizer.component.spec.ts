import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVisualizerComponent } from './stars-visualizer.component';

describe('StarsVisualizerComponent', () => {
  let component: StarsVisualizerComponent;
  let fixture: ComponentFixture<StarsVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsVisualizerComponent]
    });
    fixture = TestBed.createComponent(StarsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
