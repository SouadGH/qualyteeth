import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MouthComponent } from './mouth.component';

describe('MouthComponent', () => {
  let component: MouthComponent;
  let fixture: ComponentFixture<MouthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouthComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
