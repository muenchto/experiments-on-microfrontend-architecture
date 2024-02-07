import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from '../other-component/other.component';
import { AppModule } from '../app.module';
import {
  LoadRemoteEntryEsmOptions,
  LoadRemoteModuleEsmOptions,
  LoadRemoteModuleOptions,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    <app-other></app-other>

<app-mfe1 [hideUrlInput]="true"></app-mfe1>

    <app-mfe-wrapper
      [config]="mfe2RemoteWebpackModuleOptions"
      [inputs]="{ inputText: 'Hello second Mfe2! Greetings, your Shell' }"
      [outputs]="{ messageSentEvent: { eventType: 'messageSent' } }"
    ></app-mfe-wrapper>
  `,
})
export class DashboardComponent {

  public mfe2RemoteWebpackModuleOptions: LoadRemoteModuleEsmOptions = {
    type: 'module',
    exposedModule: './my-standalone-component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
  };

}
