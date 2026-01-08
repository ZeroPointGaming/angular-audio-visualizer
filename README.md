# Angular Audio Visualizer

A browser based audio visualizer built with Angular that allows users to load and play audio files while rendering real time, procedurally generated visualizations driven by audio frequency data.

This project demonstrates advanced component and service driven architecture, real time signal processing, dynamic canvas rendering, and complex custom CSS design within a modern Angular application.

---

## Overview

Angular Audio Visualizer is a client side web application that processes audio files directly in the browser and transforms sound data into dynamic visual output. The application leverages the Web Audio API to analyze frequency and amplitude data, which is then converted into mathematically driven visual representations rendered in real time.

The architecture is intentionally modular, separating concerns across Angular components and services to ensure maintainability, scalability, and clear responsibility boundaries.

---

## Key Features

- Browser based audio playback with no server dependency
- Real time audio frequency analysis
- Dynamic, procedurally generated visualizations
- Component driven Angular architecture
- Service driven audio processing and state management
- Advanced mathematical transformations for visual rendering
- Custom CSS driven UI and layout design
- Responsive rendering optimized for performance

---

## Architecture

### Component Driven Development

The application is structured around Angular components, each responsible for a distinct part of the UI or rendering pipeline. Components manage visual presentation and user interaction while remaining decoupled from audio processing logic.

This approach enables:
- Clear separation of concerns
- Reusable UI elements
- Easier testing and refactoring
- Scalable feature expansion

---

### Service Driven Audio Processing

Core audio logic is encapsulated within Angular services, isolating audio decoding, playback control, and frequency analysis from UI logic.

Services handle:
- Web Audio API initialization
- Audio context management
- Frequency and waveform data extraction
- Shared state and data flow between components

This design ensures predictable data handling and avoids tight coupling between visual rendering and audio processing.

---

## Procedural Visualization and Mathematics

The visualizer relies heavily on mathematical operations to translate audio data into visual output. Frequency bins and amplitude values are transformed using scaling functions, trigonometric calculations, interpolation, and normalization techniques to generate smooth, reactive animations.

These calculations drive:
- Shape deformation
- Color transitions
- Motion intensity
- Spatial distribution of visual elements

The result is a responsive, organic visual experience that adapts dynamically to the audio being played.

---

## Styling and UI Design

The application uses custom CSS to create a visually engaging interface that complements the audio visualizations. Styling is carefully designed to enhance immersion without distracting from the rendered visuals.

Key styling considerations include:
- Custom layouts and positioning
- Responsive scaling for different screen sizes
- Visual hierarchy and contrast
- Performance conscious animation techniques

---

## Technologies Used

- Angular
- TypeScript
- Web Audio API
- HTML5 Canvas
- Advanced CSS
- Browser native audio processing

---

## Use Case

This project serves as both a functional audio visualization tool and a technical demonstration of advanced front end engineering concepts, including real time data processing, procedural graphics, and scalable Angular application architecture.

---

## Notes

- Audio processing and visualization occur entirely on the client side.
- Performance is dependent on browser capabilities and hardware.
- The project is designed as a technical showcase rather than a production streaming application.

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
