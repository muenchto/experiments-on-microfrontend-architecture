import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeWrapperComponent } from '../common/mfe-wrapper-component/mfe-wrapper.component';
import { RemoteMfeConfigInputComponent } from '../common/remote-mfe-config-input/remote-mfe-config-input.component';
import { LoadRemoteModuleEsmOptions, LoadRemoteModuleOptions } from '@angular-architects/module-federation';

@Component({
  selector: 'app-mfe2-normal',
  standalone: true,
  template: `
    <app-remote-mfe-config-input
      (newUrl)="setNewUrl($event)"
    ></app-remote-mfe-config-input>
    <ng-container *ngIf="mfe2RemoteWebpackModuleOptions">
      <app-mfe-wrapper
        [config]="mfe2RemoteWebpackModuleOptions"
        [inputs]="{ inputText: 'Hello first Mfe2! Greetings, your Shell' }"
        [outputs]="{ messageSentEvent: { eventType: 'messageSent' } }"
      ></app-mfe-wrapper>
    </ng-container>
  `,
  styleUrls: ['./mfe2-normal.component.scss'],
  imports: [CommonModule, MfeWrapperComponent, RemoteMfeConfigInputComponent],
})
export class Mfe2NormalComponent {
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected mfe2RemoteWebpackModuleOptions: LoadRemoteModuleEsmOptions | null = {
    type: 'module',
    exposedModule: './my-standalone-component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
  };

  protected setNewUrl(url: string): void {
    console.log('setNewUrl: ', url);
    if (url) {
      this.mfe2RemoteWebpackModuleOptions = null;
      this.changeDetector.detectChanges();
      this.mfe2RemoteWebpackModuleOptions = {
        type: 'module',
        exposedModule: './my-standalone-component',
        remoteEntry: `${url}/remoteEntry.js`,
      };
      console.log(
        'new mfe2RemoteWebpackModuleOptions',
        this.mfe2RemoteWebpackModuleOptions
      );
    }
  }
}
