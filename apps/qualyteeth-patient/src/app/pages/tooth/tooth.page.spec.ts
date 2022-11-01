import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToothPage } from './tooth.page';

describe('ToothPage', () => {
  let component: ToothPage;
  let fixture: ComponentFixture<ToothPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToothPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
