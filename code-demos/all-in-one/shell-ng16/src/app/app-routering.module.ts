import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Mfe1WCComponent } from './mfe1-wc/mfe1-wc.component';
import { OtherComponent } from './other-component/other.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Mfe2NormalComponent } from './mfe2-normal/mfe2-normal.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'mfe1',
    component: Mfe1WCComponent,
  },
  {
    path: 'mfe2',
    component: Mfe2NormalComponent,
  },
  { path: 'other', component: OtherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
