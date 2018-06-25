import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxEventsCalendarModule } from 'ngx-events-calendar';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        NgxEventsCalendarModule,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
