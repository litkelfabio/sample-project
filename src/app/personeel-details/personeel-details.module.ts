import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersoneelDetailsPageRoutingModule } from './personeel-details-routing.module';

import { PersoneelDetailsPage } from './personeel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersoneelDetailsPageRoutingModule
  ],
  declarations: [PersoneelDetailsPage]
})
export class PersoneelDetailsPageModule {}
