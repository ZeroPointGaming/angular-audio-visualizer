import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lighthouse-visualizer',
  templateUrl: './lighthouse-visualizer.component.html',
  styleUrls: ['./lighthouse-visualizer.component.css']
})
export class LighthouseVisualizerComponent {

  ngOnInit() {
    // Your JavaScript code goes here

    const file = document.getElementById("thefile") as HTMLInputElement;
    const audio = document.getElementById("audio") as HTMLMediaElement;

    file.onchange = (event) => {
      const files = file.files;
      if (!files) return;

      const fileUrl = URL.createObjectURL(files[0]);
      if (!fileUrl) return;

      audio.src = fileUrl;
      audio.load();
      audio.play();

      //Splits the string of the file name by - and selects the second array index, then strips common music file extensions
      /*$("#songTitle").val($("#thefile").val().split('-')[1]
        .replace('.mp3', '')
        .replace('.m4a', '')
        .replace('.wav', '')
        .replace('.ogg', '')
        .replace('.webm', '')
        .replace('.flac', '')
        .replace('.opus', '')
        .replace('.oga', '')
        .replace('.mid', '')
        .replace('.webp', '')
        .replace('.midi', ''))
      $("#titleHeading").text($("#songTitle").val());
      $("#songTitle").hide();
      $("#thefile").hide();*/

      const context = new AudioContext();
      const src = context.createMediaElementSource(audio);
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
      gradient.addColorStop(0, "#005eff"); // Blue
      gradient.addColorStop(0.5, "#ff68ff"); // Pink
      gradient.addColorStop(0.8, "#cc00cc"); // Purple
      gradient.addColorStop(1, "#ffff00"); // Yellow

      const barWidth = (2 * Math.PI * innerCircleRadius) / bufferLength;

      function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sliceAngle = (2 * Math.PI) / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const frequency = (i / bufferLength) * (context.sampleRate / 2);
          let amplitude = dataArray[i] / 128;

          if (frequency > 10000) {
            amplitude *= 1.5;
          }

          const barHeight = amplitude * (waveformRadius - innerCircleRadius);
          const angle = sliceAngle * i - Math.PI / 2;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const startX = centerX + Math.cos(angle) * innerCircleRadius;
          const startY = centerY + Math.sin(angle) * innerCircleRadius;
          const endX = centerX + Math.cos(angle) * (innerCircleRadius + barHeight);
          const endY = centerY + Math.sin(angle) * (innerCircleRadius + barHeight);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = barWidth;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, innerCircleRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ffffff";
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

      audio.play();
      renderFrame();
      renderFrame2();
    };

    $(document).ready(function() {
      $(document).on('keydown', function(event: any) {
        if (event.key === "Escape") {
          $("#songTitle").show();
          $("#thefile").show();
        }
      });
    });
  }

}
