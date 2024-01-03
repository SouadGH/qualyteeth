import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdontogramToothComponent } from './tooth.component';

describe('ToothComponent', () => {
  let component: OdontogramToothComponent;
  let fixture: ComponentFixture<OdontogramToothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramToothComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdontogramToothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
