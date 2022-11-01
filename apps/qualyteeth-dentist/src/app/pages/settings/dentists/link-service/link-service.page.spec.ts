import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkServicePage } from './link-service.page';

describe('LinkServicePage', () => {
  let component: LinkServicePage;
  let fixture: ComponentFixture<LinkServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
