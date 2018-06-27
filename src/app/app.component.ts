import { EmptyHeaderComponent } from 'projects/ngx-events-calendar/src/lib/ngx-events-calendar/ngx-events-calendar.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public datesWithEvent$ = new BehaviorSubject<Array<Date>>([null]);
  public currentMonth = new Date();

  ngOnInit() {
    this.datesWithEvent$.next([new Date()]);
  }

  onCalendarDateSelected(date: Date) {
    console.log('Selected date: ', date);
  }
}
