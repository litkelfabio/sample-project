import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdealistPage } from './idealist.page';

describe('IdealistPage', () => {
  let component: IdealistPage;
  let fixture: ComponentFixture<IdealistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdealistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdealistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
