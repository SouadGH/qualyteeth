import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdontogramPage } from './odontogram.page';

describe('TreatmentsPage', () => {
  let component: OdontogramPage;
  let fixture: ComponentFixture<OdontogramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdontogramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
