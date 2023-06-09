import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.css']
})
export class ControlMenuComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileNameInput') fileNameInput!: ElementRef<HTMLInputElement>;

  constructor() {}

  @HostListener('document:keydown.escape')
  openModal() {
    // Show the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('controlMenuModal')!);
    modal.show();
  }

  selectFile(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileNameInput.nativeElement.value = file.name;
    }
  }

  play() { } //Executes the play function in the main component.
}
