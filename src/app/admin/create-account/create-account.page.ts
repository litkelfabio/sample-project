import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserServiceService, User} from 'src/app/user/user-service.service';
import { ToastController, AlertController} from  '@ionic/angular';
import {  MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye';
  public existingEmail: string;
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
  cp: "",
  
}
admin= false;

  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UserServiceService,
    private toastCtrl:  ToastController, 
    private router: Router, 
    public menuCtrl: MenuController,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    console.log(this.user.role)
    this.menuCtrl.enable(true, 'first');
    if(this.user.role == 'Admin'){
      this.admin = true
    }
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(user => {
        this.user = user;
        console.log(this.user.role)
      });
    }
  }

 async addUser() {
    const loading =  await this.loadingController.create({
    });
  loading.present();
  console.log("this.existingEmail " + this.existingEmail);



if(this.existingEmail.length > 0){
      console.log("Email is already existing " + this.existingEmail);
        this.presentAlert("Existing Username");
        loading.dismiss();
  }else{
    this.userService.addUser(this.user).then(() => {
      this.router.navigateByUrl('/landing');
      this.showToast('User added');
      loading.dismiss();
    }, err => {
      this.showToast('There was a problem adding your User 😞');
    });
  }
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

   confirmingEmail(){
    if(this.user.email != null || this.user.email != "" || this.user.email != undefined){
      this.checkEmail();
    }
  }

  async checkEmail(){
    const loading =  await this.loadingController.create({
    });
  loading.present();
      console.log("Call checkEmail()");
      this.existingEmail = "";
      this.userService.getUserByEmail(this.user.email).subscribe(data => {
        try{
        console.log(data);
        this.existingEmail = data[0].email;
        console.log("Email Data found: " + data[0].email);
        }finally{
          this.addUser();
          loading.dismiss();
        }
      });
    }
    
    presentAlert(msg) {
      this.alertController.create({
        header:'Alert',
        message:msg,
        buttons: ['OK']
      }).then(alert => alert.present());
     }
}
