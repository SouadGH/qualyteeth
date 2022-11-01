import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiagnosticsPage } from './diagnostics.page';

describe('DiagnosticsPage', () => {
  let component: DiagnosticsPage;
  let fixture: ComponentFixture<DiagnosticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
