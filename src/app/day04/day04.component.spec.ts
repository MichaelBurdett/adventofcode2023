import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day04Component } from './day04.component';

describe('Day04Component', () => {
  let component: Day04Component;
  let fixture: ComponentFixture<Day04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Day04Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
