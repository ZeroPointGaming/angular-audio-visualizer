import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImageParallaxVisualizerComponent } from './multi-image-parallax-visualizer.component';

describe('MultiImageParallaxVisualizerComponent', () => {
  let component: MultiImageParallaxVisualizerComponent;
  let fixture: ComponentFixture<MultiImageParallaxVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiImageParallaxVisualizerComponent]
    });
    fixture = TestBed.createComponent(MultiImageParallaxVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
