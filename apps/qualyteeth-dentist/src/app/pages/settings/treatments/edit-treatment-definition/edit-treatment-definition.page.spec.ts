import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTreatmentDefinitionPage } from './edit-treatment-definition.page';

describe('EditTreatmentDefinitionPage', () => {
  let component: EditTreatmentDefinitionPage;
  let fixture: ComponentFixture<EditTreatmentDefinitionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTreatmentDefinitionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTreatmentDefinitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
