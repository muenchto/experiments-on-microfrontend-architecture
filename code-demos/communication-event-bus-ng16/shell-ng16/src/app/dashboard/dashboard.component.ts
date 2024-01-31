import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from '../other-component/other.component';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    <app-other></app-other>
    <app-mfe1></app-mfe1>
  `,
})
export class DashboardComponent {

}
