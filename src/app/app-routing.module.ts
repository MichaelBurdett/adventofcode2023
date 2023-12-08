import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Day01Component} from "./day01/day01.component";
import {Day02Component} from "./day02/day02.component";
import {HomeComponent} from "./home/home.component";
import {Day03Component} from "./day03/day03.component";
import {Day04Component} from "./day04/day04.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'day01',
    component: Day01Component
  },
  {
    path: 'day02',
    component: Day02Component
  },
  {
    path: 'day03',
    component: Day03Component
  },
  {
    path: 'day04',
    component: Day04Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
