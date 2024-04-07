import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatnotificationComponent } from './repeatnotification.component';

describe('RepeatnotificationComponent', () => {
  let component: RepeatnotificationComponent;
  let fixture: ComponentFixture<RepeatnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
