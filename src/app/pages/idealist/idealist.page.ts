import { Component, OnInit } from '@angular/core';
import { IdeaService, Citizen} from 'src/app/services/idea.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-idealist',
  templateUrl: './idealist.page.html',
  styleUrls: ['./idealist.page.scss'],
})
export class IdealistPage implements OnInit {

  public citizen: Observable<Citizen[]>;
  public ExactCitizen: Observable<Citizen[]>;
  public loadCitizen: Observable<Citizen[]>;
  public loadedCitizen: Observable<Citizen[]>;
  noCitizen:any;
  constructor( private ideaService: IdeaService) {
    this.loadCitizen= this.ideaService.getAllCitizens();
    this.citizen= this.loadCitizen;
    this.loadedCitizen= this.loadCitizen;
   }

  async ngOnInit() {
    this.ideaService.getAllCitizens().subscribe(data => { 
      if(data.length == 0){
        this.noCitizen = true;
      }
      else{
        this.citizen = this.ideaService.getAllCitizens();
      }
      });
    
  }

  initializeItems(): void {
    this.citizen = this.loadedCitizen;
    }
    
    filterList(event){
      this.initializeItems();
      const searchTerm = event.srcElement.value;
      if (!searchTerm) {
        this.noCitizen =false
        return this.loadCitizen 
      }else{
        this.ideaService.getCitizenByExactName(event.target.value).subscribe(data =>{
          if(data.length != 0){
            this.citizen = this.ideaService.getCitizenByExactName(event.target.value)
            this.noCitizen =false
          }else{
            this.citizen =  this.ideaService.getCitizenByName(event.target.value)
            this.noCitizen =false
          }
        })
        this.ideaService.getCitizenByName(event.target.value).subscribe(data=>{
        if(data.length ==0){
          this.noCitizen = true
        }
        })
      }
    }
}
