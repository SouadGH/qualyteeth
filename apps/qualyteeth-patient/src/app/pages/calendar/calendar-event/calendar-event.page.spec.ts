import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarEventPage } from './calendar-event.page';

describe('CalendarEventPage', () => {
  let component: CalendarEventPage;
  let fixture: ComponentFixture<CalendarEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
