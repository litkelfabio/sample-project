import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelandingPage } from './personnelanding.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnelandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelandingPageRoutingModule {}
