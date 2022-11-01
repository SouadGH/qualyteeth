import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSurgeryPage } from './edit-surgery.page';

describe('EditSurgeryPage', () => {
  let component: EditSurgeryPage;
  let fixture: ComponentFixture<EditSurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSurgeryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
