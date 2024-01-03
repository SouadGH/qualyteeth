import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DentistPage } from './dentist.page';

describe('DentistPage', () => {
  let component: DentistPage;
  let fixture: ComponentFixture<DentistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DentistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
