import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersoneelDetailsPage } from './personeel-details.page';

const routes: Routes = [
  {
    path: '',
    component: PersoneelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersoneelDetailsPageRoutingModule {}
