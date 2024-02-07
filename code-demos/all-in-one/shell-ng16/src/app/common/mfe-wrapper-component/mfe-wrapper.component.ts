import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  LoadRemoteModuleEsmOptions,
  LoadRemoteModuleOptions,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import { EventBus } from 'src/app/event-bus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mfe-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-container *ngIf="remoteMfeLoading">
      <h5>Loading remote MFE...</h5>
    </ng-container>
    <ng-container *ngIf="remoteMfeLoadError">
      <h5>Failed to load remote MFE from {{config?.remoteEntry}}</h5>
    </ng-container>
    <div class="mfe-container" #mfe></div>`,
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
  @Input() public config: (LoadRemoteModuleEsmOptions & { name?: string }) | null =
    null;

  @Input() public inputs: { [key: string]: unknown } = {};
  @Input() public outputs: { [key: string]: { eventType: string } } = {};

  @ViewChild('mfe', { read: ViewContainerRef, static: true })
  private readonly _viewContainerRef?: ViewContainerRef;

  protected remoteMfeLoadError = false;
  protected remoteMfeLoading = true;

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
    this.remoteMfeLoading = false;
    if (this.remoteMfeLoadError) {
      return;
    }

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
