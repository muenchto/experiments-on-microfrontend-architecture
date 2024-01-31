import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Mfe1Component } from './mfe1-component/mfe1.component';
import { OtherComponent } from './other-component/other.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routering.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    Mfe1Component,
    OtherComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
