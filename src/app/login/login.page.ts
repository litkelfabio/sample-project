import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {  Router, NavigationExtras } from '@angular/router';
import { UserServiceService, User} from 'src/app/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye';
 

  showSplash = true;
  public role:string;
  public status:string;
  public email: string;
  public password: string;
  public em: string;
  public pass: string;
  public barangay: string;
  //public stat: string;
  Users: any;
  
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
    
   //this.Users = this.user
  constructor(public afAuth: AngularFireAuth,public router: Router, private userService: UserServiceService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private loadingController: LoadingController,private navController: NavController ) {
    //this.atype = this.activatedRoute.snapshot.paramMap.get('atype');
    
   }
   togglePassword():void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon ='eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
   }

   ngOnInit(){

   }

   async login(){
     console.log(this.email, this.password);
    try{
      if(this.email == null &&this.password == null){
        this.presentAlert("Please Input Username and Password");
        
      }else if(this.email == null || this.email == ""){
        this.presentAlert("Please Input Username");
      
      }
      else if(this.password == null){
        this.presentAlert("Please Input Password");
        
      }else{
      const loading =  await this.loadingController.create({
        message: 'Logging In..',
        duration: 15000
      });
    loading.present();
    
      try{
        this.userService.getUserByEmail(this.email).subscribe(  response => {
          try{
          console.log(response[0]['name'])
          this.em = response[0]['email'];
          this.pass = response[0]['password'];
          this.role = response[0]['role'];
          this.barangay = response[0]['barangay'];
          
            
          
          // if(this.user.role == 'DeActive'){
          //   //this.router.navigateByUrl('/login');
          //   this.presentAlert("DeActivated Account!");
            
          // }
          }catch (e){
            this.presentAlert("No User Found");
            loading.dismiss();
          console.log(JSON.stringify(e));
        }
        
          if(this.em == this.email && this.pass == this.password && this.role == 'Admin' ){
          //let event = this.userService.getUserByEmail(this.email).subscribe
          
            //this.router.navigate(['/menu/side']);
            
            this.navController.navigateRoot('/landing');
            loading.dismiss();
            //let navigationExtras : NavigationExtras = {state:{user:this.user}}
            //this.router.navigate(['/menu/side'], navigationExtras)
          }
            else if(this.em == this.email && this.pass == this.password && this.role == 'Personnel'){
              this.platform.ready().then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                timer(3000).subscribe(()=> this.showSplash = false)
              });
    
              this.navController.navigateRoot('/duty');
              loading.dismiss();
            }
            else if(this.em == this.email && this.pass == this.password && this.role == 'Barangay Official' ){
              this.platform.ready().then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                timer(3000).subscribe(()=> this.showSplash = false)
              });
             
              
              this.navController.navigateRoot('/personnelanding');
              loading.dismiss();
            }
            else if(this.em == this.email && this.pass != this.password){
              this.presentAlert("Wrong Password");
              loading.dismiss();
            }
            // else if(this.em == this.email && this.pass == this.password && this.atype == 'Admin' && this.status == 'DeActive' ){
            //   this.presentAlert("DeActivated Account!");
            //   loading.dismiss();
            // }
            // else if(this.em == this.email && this.pass == this.password && this.atype == 'Clerk' && this.status == 'DeActive' ){
            //   this.presentAlert("DeActivated Account!");
            //   loading.dismiss();
            // }
            // else if(this.em == this.email && this.pass == this.password && this.atype == 'Guard' && this.status == 'DeActive' ){
            //   this.presentAlert("DeActivated Account!");
            //   loading.dismiss();
            // }
            // else if(this.em != this.email || this.pass != this.password ){
            //   //this.presentAlert("No User Found");
            // }
          
        });
        }catch(e){
          console.log(JSON.stringify(e));
          //
        }
      
        } 
    }catch{
      this.presentAlert("Error! Please check your internet connection");
    }  
    
  }
  
  

  
  presentAlert(msg) {
    this.alertController.create({
      header:'Alert',
      message:msg,
      buttons: ['OK']
    }).then(alert => alert.present());
   }
}
