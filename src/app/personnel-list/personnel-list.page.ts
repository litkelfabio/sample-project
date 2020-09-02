import { Component, OnInit } from '@angular/core';
import { IdeaService, Citizen} from 'src/app/services/idea.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.page.html',
  styleUrls: ['./personnel-list.page.scss'],
})
export class PersonnelListPage implements OnInit {

  public citizen: Observable<Citizen[]>;

  constructor( private ideaService: IdeaService) { }

  ngOnInit() {
    this.citizen = this.ideaService.getCitizens();
  }

}
