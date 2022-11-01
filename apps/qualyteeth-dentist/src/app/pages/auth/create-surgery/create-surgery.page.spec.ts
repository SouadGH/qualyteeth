import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSurgeryPage } from './create-surgery.page';

describe('CreateSurgeryPage', () => {
  let component: CreateSurgeryPage;
  let fixture: ComponentFixture<CreateSurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurgeryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
