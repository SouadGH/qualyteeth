import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDiagnosticDefinitionPage } from './edit-diagnostic-definition.page';

describe('EditDiagnosticDefinitionPage', () => {
  let component: EditDiagnosticDefinitionPage;
  let fixture: ComponentFixture<EditDiagnosticDefinitionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagnosticDefinitionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDiagnosticDefinitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
