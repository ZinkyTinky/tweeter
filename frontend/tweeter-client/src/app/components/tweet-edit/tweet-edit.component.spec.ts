import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetEditComponent } from './tweet-edit.component';

describe('TweetEditComponent', () => {
  let component: TweetEditComponent;
  let fixture: ComponentFixture<TweetEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetEditComponent]
    });
    fixture = TestBed.createComponent(TweetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
