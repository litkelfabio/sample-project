import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { IdeaService, Citizen} from 'src/app/services/idea.service';
import { ToastController} from  '@ionic/angular';
import  { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera } from '@ionic-native/camera/ngx'

import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  scannedData: string;
  imageUrl:any;
  items: Observable<any[]>;
 public existingQR: string; 
  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;
  previewImg= null;
  previewImgList:any;
  imageStorage:any;
  selectedFile: any;

  citizen: Citizen ={
    name: "",
    barangay: "",
    street: "",
    municipality: "",
    houseno: null,
    date: null,
    status: "",
    qr: "",
    cp: "",
    imgURL: "",
    imgID:""
  }

  constructor(private activatedRoute: ActivatedRoute, 
    private ideaService: IdeaService,
    private toastCtrl:  ToastController, 
    private router: Router, 
    private barcodeScanner: BarcodeScanner,
    private db: AngularFirestore, 
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private alertController: AlertController,
    ) {
      // this.itemsRef = db.collection('items')
      // this.items = this.itemsRef.valueChanges();
     }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getCitizen(id).subscribe(citizens => {
        this.citizen = citizens;
        this.previewImgList = this.citizen.imgURL
      });
    }
  }

  presentAlert(msg) {
    this.alertController.create({
      header:'Alert',
      message:msg,
      buttons: ['OK']
    }).then(alert => alert.present());
   }

async addCitizen(){
    const loading =  await this.loadingController.create({
      duration: 2000
    });
    loading.present();
    if(this.existingQR.length > 0){
      this.presentAlert("QR Code Already Belongs to someone");
      loading.dismiss()
    }else{
      this.ideaService.addCitizen(this.citizen).then(async resp =>{
        this.imageUrl = await this.uploadFile(resp.id, this.selectedFile)
        this.imageStorage = this.imageUrl
        console.log(this.imageUrl)
        var id= resp.id
        this.ideaService.deleteCitizen(resp.id)
        this.citizen.imgURL = this.imageStorage
        this.citizen.imgID = id
        this.ideaService.addCitizen(this.citizen)
        console.log(this.citizen.imgURL)
      }).then(() => {
        this.router.navigateByUrl('/landing');
        loading.dismiss()
        this.showToast('Citizen added');
      }, err => {
        console.log(err)
        this.showToast('There was a problem adding your idea 😞');
      });
    }
  }

  async updateCitizen() {
    const loading =  await this.loadingController.create({
      duration: 2000
    });
    loading.present();
    if(this.selectedFile){
      this.remove(this.citizen.imgID)
     this.uploadFile(this.citizen.imgID, this.selectedFile)
     this.ideaService.updateCitizen(this.citizen).then(() => {
      this.router.navigateByUrl('/landing');
      loading.dismiss()
      this.showToast('Citizen updated');
    }, err => {
      this.showToast('There was a problem updating your Citizen 😞');
    });
    }else{
      this.ideaService.updateCitizen(this.citizen).then(() => {
        this.router.navigateByUrl('/landing');
        loading.dismiss()
        this.showToast('Citizen updated');
      }, err => {
        this.showToast('There was a problem updating your Citizen 😞');
      });
    }
  }

 async deleteCitizen() {
    const loading =  await this.loadingController.create({
      duration: 2000
    });
    loading.present();
    this.ideaService.deleteCitizen(this.citizen.id).then(() => {
      this.remove(this.citizen.imgID)
      this.router.navigateByUrl('/landing');
      loading.dismiss()
      this.showToast('Ctizen deleted');
    }, err => {
      this.showToast('There was a problem deleting your Citizen 😞');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  scanCode() {
    this.scannedData = "";
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData.text;
        this.citizen.qr = barcodeData.text;
        if(this.scannedData != null || this.scannedData != "" || this.scannedData != undefined){
          //this.idea.qr ='111';
          this.checkQR();
        }
      }) .catch(err => {
        console.log("Error", err);
        return;
      });
      
  }

  async checkQR(){
    const loading =  await this.loadingController.create({
      duration: 2000
    });
    loading.present();
    
    //console.log("this.idea.qr " + this.idea.qr);
    console.log("Call checkQR()");
    this.existingQR = "";
    this.ideaService.getCitizenByQR(this.citizen.qr).subscribe(data => { 
      console.log(data)
      console.log(data['qr'])
      console.log(data[0]['qr'])
      console.log("QR Data found: " + data[0].qr);
      this.existingQR = data[0].qr;
      loading.dismiss()
    });
  }

  chooseFile (event) {
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.previewImg = event.target.result;
        this.citizen.imgURL = null
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      let fileList: FileList = event.target.files;  
      let file: File = fileList[0];
      console.log(file);

    this.selectedFile = event.target.files
    console.log(event.target.files)
  
  }


  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        //await this.presentLoading();
        const task = await this.storage.ref('images').child(id).put(file[0])
        //console.log(task)
        console.log(id)
        //this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  remove(item){
    console.log(item);
      this.storage.ref(`images/${item}`).delete()
  }

  updateImg(item){
    this.storage.ref(`images/${item}`).updateMetadata(item);

  }
}
