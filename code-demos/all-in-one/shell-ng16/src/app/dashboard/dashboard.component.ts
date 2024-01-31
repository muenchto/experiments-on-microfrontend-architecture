import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from '../other-component/other.component';
import { AppModule } from '../app.module';
import {
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
    <app-mfe-wrapper
      [config]="mfe2RemoteWebpackModuleOptions"
      [inputs]="{ inputText: 'Hello first Mfe2! Greetings, your Shell' }"
      [outputs]="{ 'messageSentEvent': { eventType: 'messageSent' } }"
    ></app-mfe-wrapper>
    <app-mfe-wrapper
      [config]="mfe2RemoteWebpackModuleOptions"
      [inputs]="{ inputText: 'Hello second Mfe2! Greetings, your Shell' }"
      [outputs]="{ 'messageSentEvent': { eventType: 'messageSent' } }"
    ></app-mfe-wrapper>
  `,
})
export class DashboardComponent {
  @ViewChild('mfe', { read: ViewContainerRef, static: true })
  private readonly _viewContainerRef?: ViewContainerRef;

  @ViewChild('mfe3', { read: ViewContainerRef, static: true })
  private readonly mfe3Wrapper?: WebComponentWrapper;

  ngAfterViewInit() {
    console.log('mfe3 wrapper', this.mfe3Wrapper);
  }

  public readonly mfe2RemoteWebpackModuleOptions: LoadRemoteModuleOptions = {
    type: 'module',
    exposedModule: './my-standalone-component',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
  };

  public readonly mfe1WebComponentOptions: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:4203/remoteEntry.js',
    type: 'module',
    exposedModule: './standalone-component-as-web-component',
    elementName: 'my-mfe3-component',
  };

  public readonly mfe1WebComponentProps: { [key: string]: unknown } = {
    inputText: 'Hello from Shell',
  };

  public readonly mfe1WebComponentEvents: {
    [key: string]: (event: Event) => void;
  } = {
    'message-sent': (event: Event) => {
      console.log('mfe3 emitted: ', (event as CustomEvent).detail);
    },
  };
}
