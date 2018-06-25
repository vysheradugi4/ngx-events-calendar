import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxEventsCalendarModule } from 'projects/ngx-events-calendar/src/public_api';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxEventsCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
