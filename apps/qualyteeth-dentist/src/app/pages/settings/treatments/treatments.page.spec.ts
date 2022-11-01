import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TreatmentsPage } from './treatments.page';

describe('TreatmentsPage', () => {
  let component: TreatmentsPage;
  let fixture: ComponentFixture<TreatmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
