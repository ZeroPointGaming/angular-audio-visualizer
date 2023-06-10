import { TestBed } from '@angular/core/testing';

import { VideoVisualizationService } from './video-visualization.service';

describe('VideoVisualizationService', () => {
  let service: VideoVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
