import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DutyPage } from './duty.page';

const routes: Routes = [
  {
    path: '',
    component: DutyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DutyPageRoutingModule {}
