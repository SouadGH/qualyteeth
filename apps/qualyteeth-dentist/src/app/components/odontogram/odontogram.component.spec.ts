import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdontogramComponent } from './odontogram.component';

describe('OdontogramComponent', () => {
  let component: OdontogramComponent;
  let fixture: ComponentFixture<OdontogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdontogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
