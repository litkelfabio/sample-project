import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdealistPageRoutingModule } from './idealist-routing.module';

import { IdealistPage } from './idealist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdealistPageRoutingModule
  ],
  declarations: [IdealistPage]
})
export class IdealistPageModule {}
