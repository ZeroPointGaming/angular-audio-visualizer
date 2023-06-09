import { TestBed } from '@angular/core/testing';

import { AudioVisualizationService } from './audio-visualization.service';

describe('AudioVisualizationService', () => {
  let service: AudioVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
