import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DutyMemberPageRoutingModule } from './duty-member-routing.module';

import { DutyMemberPage } from './duty-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DutyMemberPageRoutingModule
  ],
  declarations: [DutyMemberPage]
})
export class DutyMemberPageModule {}
