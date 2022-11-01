import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinSurgeryPage } from './join-surgery.page';

describe('JoinSurgeryPage', () => {
  let component: JoinSurgeryPage;
  let fixture: ComponentFixture<JoinSurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinSurgeryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinSurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
