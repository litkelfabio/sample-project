import { Component, OnInit } from '@angular/core';
import { UserServiceService, User} from 'src/app/user/user-service.service';
import { Observable } from 'rxjs';
import {  MenuController } from '@ionic/angular';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public user: Observable<User[]>

  constructor(private userService: UserServiceService,
    public menuCtrl: MenuController) { }

  ngOnInit() {
    this.user = this.userService.getUsers();
    this.menuCtrl.enable(true, 'first');
  }

}
