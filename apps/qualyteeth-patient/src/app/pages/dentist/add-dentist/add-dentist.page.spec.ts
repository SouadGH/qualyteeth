import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDentistPage } from './add-dentist.page';

describe('AddDentistPage', () => {
  let component: AddDentistPage;
  let fixture: ComponentFixture<AddDentistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDentistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDentistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
