import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DutyMemberPage } from './duty-member.page';

const routes: Routes = [
  {
    path: '',
    component: DutyMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DutyMemberPageRoutingModule {}
