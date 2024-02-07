import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { AppComponent } from './app.component';
import { Mfe1WCComponent } from './mfe1-wc/mfe1-wc.component';
import { OtherComponent } from './other-component/other.component';
import { AppRoutingModule } from './app-routering.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventBus } from './event-bus';
import { MfeWrapperComponent } from './common/mfe-wrapper-component/mfe-wrapper.component';
import { RemoteMfeConfigInputComponent } from './common/remote-mfe-config-input/remote-mfe-config-input.component';

@NgModule({
  declarations: [
    AppComponent,
    Mfe1WCComponent,
    OtherComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuleFederationToolsModule,
    RemoteMfeConfigInputComponent,
    MfeWrapperComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: 'eventBus', useExisting: EventBus }],
  bootstrap: [AppComponent],
})
export class AppModule {}
