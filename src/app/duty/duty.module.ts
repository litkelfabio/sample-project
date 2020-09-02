import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DutyPageRoutingModule } from './duty-routing.module';

import { DutyPage } from './duty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DutyPageRoutingModule
  ],
  declarations: [DutyPage]
})
export class DutyPageModule {}
