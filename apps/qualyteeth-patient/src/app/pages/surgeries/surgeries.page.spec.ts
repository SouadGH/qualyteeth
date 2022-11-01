import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurgeriesPage } from './surgeries.page';

describe('SurgeriesPage', () => {
  let component: SurgeriesPage;
  let fixture: ComponentFixture<SurgeriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurgeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
