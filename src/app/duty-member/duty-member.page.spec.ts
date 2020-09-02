import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DutyMemberPage } from './duty-member.page';

describe('DutyMemberPage', () => {
  let component: DutyMemberPage;
  let fixture: ComponentFixture<DutyMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DutyMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
