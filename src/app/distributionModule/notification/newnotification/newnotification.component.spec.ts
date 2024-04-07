import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnotificationComponent } from './newnotification.component';

describe('NewnotificationComponent', () => {
  let component: NewnotificationComponent;
  let fixture: ComponentFixture<NewnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
