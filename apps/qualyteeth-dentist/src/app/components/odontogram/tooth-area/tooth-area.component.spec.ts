import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdontogramToothAreaComponent } from './tooth-area.component';

describe('ToothAreaComponent', () => {
  let component: OdontogramToothAreaComponent;
  let fixture: ComponentFixture<OdontogramToothAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramToothAreaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdontogramToothAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
