import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddActPage } from './add-act.page';

describe('AddActPage', () => {
  let component: AddActPage;
  let fixture: ComponentFixture<AddActPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddActPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
