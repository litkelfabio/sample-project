import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
@Component({
  selector: 'app-personnelanding',
  templateUrl: './personnelanding.page.html',
  styleUrls: ['./personnelanding.page.scss'],
})
export class PersonnelandingPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true, 'second');
  }

}
