import { Component, EnvironmentInjector, OnInit, ViewEncapsulation } from '@angular/core';
import { EventBus } from '../event-bus';
import { MessageSentEvent as OutputEvent } from './message-sent-event';
import {
  LoadRemoteModuleOptions,
  loadRemoteModule,
} from '@angular-architects/module-federation';

@Component({
  selector: 'app-mfe1',
  templateUrl: './mfe1.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Mfe1Component implements OnInit {
  public constructor(
    private readonly _eventBus: EventBus,
  ) {}
  protected remoteMfeLoadError = false;
  protected mfeHasBootstrapped = false;

  public async ngOnInit(): Promise<void> {
    console.log('Mfe1Component initializing');
    const loadRemoteWebpackModuleOptions: LoadRemoteModuleOptions = {
      type: 'module',
      exposedModule: './standalone-component-as-web-component',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
    };
    const webpackModule: any = await loadRemoteModule(
      loadRemoteWebpackModuleOptions
    ).catch((err: any) => (this.remoteMfeLoadError = true));
    if (this.remoteMfeLoadError) {
      return;
    }
    await webpackModule.bootstrapMyComponentAsync(this._eventBus);
    this.mfeHasBootstrapped = true;
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
