import { NgModule, enableProdMode } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { NgxEventsCalendarComponent, EmptyHeaderComponent } from './ngx-events-calendar/ngx-events-calendar.component';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    NgxEventsCalendarComponent,
    EmptyHeaderComponent,
  ],
  exports: [
    NgxEventsCalendarComponent,
  ],
  entryComponents: [
    EmptyHeaderComponent,
  ],
})
export class NgxEventsCalendarModule { }
