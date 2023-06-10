import { Injectable, Inject } from '@angular/core';

declare var $: any; // Declare jQuery

@Injectable({
  providedIn: 'root'
})
export class VideoVisualizationService {
  private video!: HTMLMediaElement;

  private colors: {[key: number]: string};

  constructor(@Inject('COLORS_TOKEN') colors: {[key: number]: string}) {
    this.colors = colors;
  }

  visualizeAudio(): HTMLMediaElement {
    const file = document.getElementById("fileInput") as HTMLInputElement;
    this.video = document.getElementById("video") as HTMLMediaElement;

    file.onchange = (event) => {
      const files = file.files;
      if (!files) return;

      const fileUrl = URL.createObjectURL(files[0]);
      if (!fileUrl) return;

      //Splits the string of the file name by - and selects the second array index, then strips common music file extensions
      const fileNameInput = $("#fileInput").val();
      let fileName = "";

      if (fileNameInput.includes("-")) {
        fileName = fileNameInput.split('-')[1];
      } else {
        const fileNameParts = fileNameInput.split("\\");
        fileName = fileNameParts[fileNameParts.length - 1];
      }

      fileName = fileName.replace('.mp3', '')
        .replace('.m4a', '')
        .replace('.wav', '')
        .replace('.ogg', '')
        .replace('.webm', '')
        .replace('.flac', '')
        .replace('.opus', '')
        .replace('.oga', '')
        .replace('.mid', '')
        .replace('.webp', '')
        .replace('.midi', '');

      $("#fileNameInput").val(fileName);
      $("#titleHeading").text(fileName);

      this.video.addEventListener('play', () => {
        $('#controlMenuModal').modal('hide');
      });

      setTimeout(() => {
        this.video.src = fileUrl;
        this.video.load();
        this.video.play();
      }, 1000);

      this.video.addEventListener('ended', () => {
        setTimeout(() => {
          $('#controlMenuModal').modal('show');
          $("#fileInput").val("");
          $("#fileNameInput").val("");
          $("#titleHeading").text("");
        }, 1000);
      });

      const context = new AudioContext();
      const src = context.createMediaElementSource(this.video);
      const analyser = context.createAnalyser();

      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!; // Non-null assertion operator

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const waveformRadius = Math.min(canvas.width, canvas.height) * 0.35 * 0.7;
      const innerCircleRadius = waveformRadius * 0.7;

      const gradient = ctx.createLinearGradient(0, canvas.height / 2 - waveformRadius, 0, canvas.height / 2 + waveformRadius);
      Object.entries(this.colors).forEach(([position, color]) => {
        gradient.addColorStop(Number(position), color);
      });

      //gradient.addColorStop(0, "#005eff"); // Blue
      //gradient.addColorStop(0.5, "#ff68ff"); // Pink
      //gradient.addColorStop(0.8, "#cc00cc"); // Purple
      //gradient.addColorStop(1, "#ffff00"); // Yellow

      const CircleGradient =  ctx.createLinearGradient(0, canvas.height / 2 - waveformRadius, 0, canvas.height / 2 + waveformRadius);
      Object.entries(this.colors).forEach(([position, color]) => {
        CircleGradient.addColorStop(Number(position), color);
      });
      //CircleGradient.addColorStop(0, "#005eff"); // Blue
      //CircleGradient.addColorStop(0.5, "#ff68ff"); // Pink
      //CircleGradient.addColorStop(0.8, "#cc00cc"); // Purple
      //CircleGradient.addColorStop(1, "#ffff00"); // Yellow

      const barWidth = (2 * Math.PI * innerCircleRadius) / bufferLength;
      const MAX_SCALE = 1.2; // Adjust this value as needed

      function renderFrame() {
        requestAnimationFrame(renderFrame);
      
        analyser.getByteFrequencyData(dataArray);
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // Get bass value
        const BASS_FREQ_RANGE_START = 20;   // start of bass frequency range in Hz
        const BASS_FREQ_RANGE_END = 100;    // end of bass frequency range in Hz
        const freqBinSize = context.sampleRate / 2 / bufferLength; // size of each frequency bin in Hz

        const bassDataStartIndex = Math.round(BASS_FREQ_RANGE_START / freqBinSize);
        const bassDataEndIndex = Math.round(BASS_FREQ_RANGE_END / freqBinSize);

        const bassDataArray = dataArray.slice(bassDataStartIndex, bassDataEndIndex); // get only the bass frequencies
        const bassValue = bassDataArray.reduce((a, b) => a + b) / bassDataArray.length;
        const bassScale = 1 + ((bassValue / 255) * (MAX_SCALE - 1));
      
        const sliceAngle = (2 * Math.PI) / bufferLength;
      
        for (let i = 0; i < bufferLength; i++) {
          const frequency = (i / bufferLength) * (context.sampleRate / 2);
          let amplitude = dataArray[i] / 128;
      
          if (frequency > 10000) {
            //amplitude *= 1.5;
          }
      
          // Apply bassScale to height and width
          const barHeight = bassScale * amplitude * (waveformRadius - innerCircleRadius);
          const angle = sliceAngle * i - Math.PI / 2;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const startX = centerX + Math.cos(angle) * (innerCircleRadius * bassScale);
          const startY = centerY + Math.sin(angle) * (innerCircleRadius * bassScale);
          const endX = centerX + Math.cos(angle) * ((innerCircleRadius + barHeight) * bassScale);
          const endY = centerY + Math.sin(angle) * ((innerCircleRadius + barHeight) * bassScale);
      
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = bassScale * barWidth; // Apply bassScale to lineWidth
          ctx.stroke();
        }
      
        // Apply bassScale to the inner circle as well
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, innerCircleRadius * bassScale, 0, 2 * Math.PI);
        ctx.strokeStyle = CircleGradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Second Visualizer
      const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
      const ctx2 = canvas2.getContext("2d")!; // Non-null assertion operator

      function resizeCanvas2() {
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight * 0.3;
      }

      window.addEventListener("resize", resizeCanvas2);
      resizeCanvas2();

      const gradient2 = ctx2.createLinearGradient(0, canvas2.height, 0, 0);
      gradient2.addColorStop(0, "#005eff"); // Blue
      gradient2.addColorStop(0.25, "#cc00cc"); // Purple
      gradient2.addColorStop(0.5, "#ff68ff"); // Pink
      gradient2.addColorStop(1, "#ffff00"); // Yellow

      function renderFrame2() {
        requestAnimationFrame(renderFrame2);

        analyser.getByteTimeDomainData(dataArray);

        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        const sliceWidth = canvas2.width / bufferLength;
        let x = 0;

        ctx2.beginPath();
        ctx2.moveTo(x, canvas2.height / 2);
        ctx2.strokeStyle = gradient2;
        ctx2.lineWidth = 2;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas2.height) / 2;

          ctx2.lineTo(x, y);
          x += sliceWidth;
        }

        ctx2.lineTo(canvas2.width, canvas2.height / 2);
        ctx2.stroke();
      }

      this.video.play();
      renderFrame();
      renderFrame2();
    };

    return this.video;
  }

  play() {
    if (this.video) {
      this.video.play();
    }
  }

  pause() {
    if (this.video) {
      this.video.pause();
    }
  }

  replay() {
    if (this.video) {
      this.video.currentTime = 0;
      this.video.play();
    }
  }
}
