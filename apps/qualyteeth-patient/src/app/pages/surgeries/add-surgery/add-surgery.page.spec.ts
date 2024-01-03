import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSurgeryPage } from './add-surgery.page';

describe('AddSurgeryPage', () => {
  let component: AddSurgeryPage;
  let fixture: ComponentFixture<AddSurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSurgeryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
