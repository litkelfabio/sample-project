import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonnelandingPage } from './personnelanding.page';

describe('PersonnelandingPage', () => {
  let component: PersonnelandingPage;
  let fixture: ComponentFixture<PersonnelandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelandingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
