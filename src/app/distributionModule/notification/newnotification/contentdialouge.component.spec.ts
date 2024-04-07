import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentdialougeComponent } from './contentdialouge.component';

describe('ContentdialougeComponent', () => {
  let component: ContentdialougeComponent;
  let fixture: ComponentFixture<ContentdialougeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentdialougeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentdialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
