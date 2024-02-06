import { Component, EnvironmentInjector, OnInit, ViewEncapsulation } from '@angular/core';
import { EventBus } from '../event-bus';
import { MessageSentEvent as OutputEvent } from './message-sent-event';
import {
  LoadRemoteModuleEsmOptions,
  LoadRemoteModuleOptions,
  loadRemoteModule,
} from '@angular-architects/module-federation';

@Component({
  selector: 'app-mfe1',
  templateUrl: './mfe1-wc.component.html',
  styleUrls: ['./mfe1-wc.component.scss'],
})
export class Mfe1WCComponent implements OnInit {
  public constructor(
    private readonly _eventBus: EventBus,
  ) {}
  protected remoteMfeLoadError = false;
  protected mfeLoaded = false;

  protected loadRemoteWebpackModuleOptions: LoadRemoteModuleEsmOptions = {
    type: 'module',
    exposedModule: './standalone-component-as-web-component',
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
  };

  public async ngOnInit(): Promise<void> {
    await this.loadAndCreateRemoteWebCompoMfe()
  }

  protected  setNewUrl(url: string): void {
    console.log('setNewUrl: ', url);
    if (url) {
      this.loadRemoteWebpackModuleOptions = {
        ...this.loadRemoteWebpackModuleOptions,
        remoteEntry: `${url}/remoteEntry.js`,
      };
      console.log(
        'new loadRemoteWebpackModuleOptions',
        this.loadRemoteWebpackModuleOptions
      );
      this.loadAndCreateRemoteWebCompoMfe();
    }
  }

  private async loadAndCreateRemoteWebCompoMfe() {
    this.remoteMfeLoadError = false;
    this.mfeLoaded = false;
    const webpackModule: any = await loadRemoteModule(
      this.loadRemoteWebpackModuleOptions
    ).catch((err: any) => (this.remoteMfeLoadError = true));
    this.mfeLoaded = true;
    if (this.remoteMfeLoadError) {
      return;
    }
    await webpackModule.bootstrapMyComponentAsync(this._eventBus);
  }

  public outputEventHandler(event: Event): void {
    // Because the `message-sent` custom event doesn't have the `bubbles` property
    // set to true we have to subscribe to it here and then republish it to the
    // event bus so it can be subscribed at any other point in the application.
    //
    // If we manually dispatched the `message-sent` custom event with `bubbles`
    // property set to true, then this messageSentEventHandler function wouldn't be needed.
    // The event bus could subscribe to the custom event from the document object
    // and republish it to the event bus. All this could happen inside the `EventBus`
    // implementation.
    const outputEvent = OutputEvent.fromCustomEvent(event);
    this._eventBus.publish({type: 'messageSent', data: outputEvent});
  }
}
