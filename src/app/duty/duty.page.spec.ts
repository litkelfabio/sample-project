import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DutyPage } from './duty.page';

describe('DutyPage', () => {
  let component: DutyPage;
  let fixture: ComponentFixture<DutyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DutyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
