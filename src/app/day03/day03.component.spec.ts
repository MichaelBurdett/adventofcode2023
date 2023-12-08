import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day03Component } from './day03.component';

describe('Day03Component', () => {
  let component: Day03Component;
  let fixture: ComponentFixture<Day03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Day03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
