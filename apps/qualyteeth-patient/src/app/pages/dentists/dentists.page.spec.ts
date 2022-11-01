import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DentistsPage } from './dentists.page';

describe('DentistsPage', () => {
  let component: DentistsPage;
  let fixture: ComponentFixture<DentistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DentistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
