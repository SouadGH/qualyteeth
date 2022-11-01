import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurgeryPage } from './surgery.page';

describe('SurgeryPage', () => {
  let component: SurgeryPage;
  let fixture: ComponentFixture<SurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
