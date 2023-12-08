import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day02Component } from './day02.component';

describe('Day02Component', () => {
  let component: Day02Component;
  let fixture: ComponentFixture<Day02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Day02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
