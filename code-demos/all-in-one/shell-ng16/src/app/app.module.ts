import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { AppComponent } from './app.component';
import { Mfe1Component } from './mfe1-component/mfe1.component';
import { OtherComponent } from './other-component/other.component';
import { AppRoutingModule } from './app-routering.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventBus } from './event-bus';
import { MfeWrapperComponent } from './common/mfe-wrapper-component/mfe-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    Mfe1Component,
    OtherComponent,
    DashboardComponent,
    MfeWrapperComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ModuleFederationToolsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: 'eventBus', useExisting: EventBus}],
  bootstrap: [AppComponent],
})
export class AppModule {}
