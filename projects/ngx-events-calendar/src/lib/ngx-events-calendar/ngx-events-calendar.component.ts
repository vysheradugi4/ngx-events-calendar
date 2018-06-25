import {
  Component,
  Input,
  Output,
  ViewChild,
  OnInit,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  ElementRef,
  Renderer2,
  ComponentFactory,
  Injector,
  ComponentFactoryResolver,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatCalendar } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-events-calendar',
  templateUrl: './ngx-events-calendar.component.html',
  styleUrls: ['./ngx-events-calendar.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class NgxEventsCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  // For custom header component.
  @Input() public header: any = null;

  // Hide header;
  @Input() public hideHeader: boolean;

  // Get date from quick look component.
  @Input() public month: Date;

  // Get calendar events
  @Input() public datesWithEvent$: BehaviorSubject<Array<Date>>;

  // For emit selected date.
  @Output() public selectedDate = new EventEmitter<Date>();

  // Get calendar from template.
  @ViewChild(MatCalendar) private _calendar: MatCalendar<Date>;

  private _eventsSubscription: Subscription;
  private _calendarSubscription: Subscription;
  private _selectedDates = new Set<string>();

  constructor(
    private _datePipe: DatePipe,
    private _elRef: ElementRef,
    private _renderer: Renderer2,
  ) { }
  ngOnInit(): void {
    // Define header component.
    if (this.hideHeader) {
      this.header = EmptyHeaderComponent;
    }
  }

  ngAfterViewInit(): void {
    // Show dates with event.
    this._eventsSubscription = this.datesWithEvent$
      .subscribe((dates: Array<Date>) => {
        dates.map(date => {
          const ariaLabelDate = this._datePipe.transform(date, 'longDate');

          // Save all dates with event in set.
          this._selectedDates.add(ariaLabelDate);

          const el = this._elRef.nativeElement
            .querySelector(`[aria-label="${ariaLabelDate}"]`);

          if (el) {
            this._renderer.addClass(
              el.querySelector('.mat-calendar-body-cell-content'),
              'mat-calendar-body-selected'
            );
          }
        });
      });

    // Intercept click on date.
    this._calendarSubscription = this._calendar.selectedChange
      .pipe(
        debounceTime(300)
      )
      .subscribe(date => {
        // Broadcast event if selected dates contain clicked date.
        if (this._selectedDates.has(this._datePipe.transform(date, 'longDate'))) {
          this.selectedDate.emit(date);
        }
      });
  }

  ngOnDestroy() {
    this._eventsSubscription.unsubscribe();
    this._calendarSubscription.unsubscribe();
  }
}

// Empty component for remove header in calendar
@Component({
  selector: 'lib-empty-header',
  template: '',
})
export class EmptyHeaderComponent { }
