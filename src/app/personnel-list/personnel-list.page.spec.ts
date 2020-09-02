import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonnelListPage } from './personnel-list.page';

describe('PersonnelListPage', () => {
  let component: PersonnelListPage;
  let fixture: ComponentFixture<PersonnelListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
