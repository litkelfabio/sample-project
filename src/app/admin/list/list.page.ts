import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserServiceService, User} from 'src/app/user/user-service.service';
import { ToastController} from  '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye';

  user: User = {
    name: "",
    email: "",
    password: "",
    createdAt: new Date().getTime(),
    barangay: "",
    street: "",
    municipality: "",
    houseno: null,
    role: "",
    cp: ""
  }
  public admin;

constructor(private activatedRoute: ActivatedRoute, 
    private userService: UserServiceService,
    private toastCtrl:  ToastController, 
    private router: Router, 
    ) { }

  ngOnInit() {
    console.log(this.user.role)
    // if(this.user.role == 'Admin'){
    //   this.admin = true
    // }
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(user => {
        this.user = user;
        console.log(this.user.role)
        if(this.user.role == 'Admin'){
          return this.admin = true;
          
        }else{
         return this.admin = false;
        }
      });
    }
    
  }

  addUser() {
    this.userService.addUser(this.user).then(() => {
      this.router.navigateByUrl('/landing');
      this.showToast('User added');
    }, err => {
      this.showToast('There was a problem adding your idea 😞');
    });
  }
 
  deleteUser() {
    this.userService.deleteUser(this.user.id).then(() => {
      this.router.navigateByUrl('/landing');
      this.showToast('User deleted');
    }, err => {
      this.showToast('There was a problem deleting your User 😞');
    });
  }
 
  updateUser() {
    this.userService.updateUser(this.user).then(() => {
      this.router.navigateByUrl('/landing');
      this.showToast('User updated');
    }, err => {
      this.showToast('There was a problem updating your User 😞');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  togglePassword():void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon ='eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
   }
}
