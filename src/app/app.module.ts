import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day01Component } from './day01/day01.component';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { Day02Component } from './day02/day02.component';
import { HomeComponent } from './home/home.component';
import { Day03Component } from './day03/day03.component';
import { Day04Component } from './day04/day04.component';
@NgModule({
  declarations: [
    AppComponent,
    Day01Component,
    Day02Component,
    HomeComponent,
    Day03Component,
    Day04Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
