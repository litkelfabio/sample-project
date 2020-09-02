import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnelandingPageRoutingModule } from './personnelanding-routing.module';

import { PersonnelandingPage } from './personnelanding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnelandingPageRoutingModule
  ],
  declarations: [PersonnelandingPage]
})
export class PersonnelandingPageModule {}
