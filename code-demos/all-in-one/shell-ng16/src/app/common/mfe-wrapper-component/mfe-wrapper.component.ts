import {
  Component,
  ComponentRef,
  EnvironmentInjector,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MessageSentEvent as OutputEvent } from './message-sent-event';
import {
  LoadRemoteModuleOptions,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import { EventBus } from 'src/app/event-bus';

@Component({
  selector: 'app-mfe-wrapper',
  templateUrl: './mfe-wrapper.component.html',
  styles: [
    `
      :host {
        all: initial;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MfeWrapperComponent implements OnInit {
  @Input() public config: (LoadRemoteModuleOptions & { name?: string }) | null =
    null;

  @Input() public inputs: { [key: string]: unknown } = {};
  @Input() public outputs: { [key: string]: { eventType: string } } = {};

  @ViewChild('mfe', { read: ViewContainerRef, static: true })
  private readonly _viewContainerRef?: ViewContainerRef;

  protected remoteMfeLoadError = false;
  protected remoteMfeLoaded = false;

  private eventBus = inject(EventBus);

  ngOnInit(): void {
    if (this.config) {
      this.loasRemoteMfe(this.config);
    }
  }

  public async loasRemoteMfe(config: LoadRemoteModuleOptions): Promise<void> {
    if (!this._viewContainerRef) {
      return;
    }

    this._viewContainerRef.clear();

    const webpackModule: any = await loadRemoteModule(config).catch(
      (err: any) => (this.remoteMfeLoadError = true)
    );
    this.remoteMfeLoaded = true;

    const componentRef: ComponentRef<any> =
      this._viewContainerRef.createComponent(
        webpackModule.MyStandaloneComponent
      );

    Object.entries(this.inputs).forEach(([key, value]) => {
      componentRef.setInput(key, value);
    });

    Object.entries(this.outputs).forEach(([key, value]) => {
      (componentRef.instance[key] as EventEmitter<unknown>).subscribe((x) => {
        this.eventBus.publish({
          type: value.eventType,
          data: x,
        });
      });
    });
  }
}
