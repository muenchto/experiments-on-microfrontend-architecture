import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remote-mfe-config-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>Remote MFE URL:</label>
    <input
      #input
      type="text"
      [placeholder]="'Enter URL for MFE'"
      [value]="mfeUrl"
    />
    <button (click)="newUrl.emit(input.value)">Set URL</button>
  `,
  styles: [
    `
      input {
        margin: 0 10px;
      }
    `,
  ],
})
export class RemoteMfeConfigInputComponent {
  mfeUrl = '';
  @Output() newUrl = new EventEmitter<string>();
}
