import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdealistPage } from './idealist.page';

const routes: Routes = [
  {
    path: '',
    component: IdealistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdealistPageRoutingModule {}
