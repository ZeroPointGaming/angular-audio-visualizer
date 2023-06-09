import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TronSunsetVisualizerComponent } from './tron-sunset-visualizer.component';

describe('TronSunsetVisualizerComponent', () => {
  let component: TronSunsetVisualizerComponent;
  let fixture: ComponentFixture<TronSunsetVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TronSunsetVisualizerComponent]
    });
    fixture = TestBed.createComponent(TronSunsetVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
