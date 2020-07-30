import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPostedComponent } from './news-posted.component';

describe('NewsPostedComponent', () => {
  let component: NewsPostedComponent;
  let fixture: ComponentFixture<NewsPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
