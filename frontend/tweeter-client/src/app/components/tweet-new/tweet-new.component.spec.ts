import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetNewComponent } from './tweet-new.component';

describe('TweetNewComponent', () => {
  let component: TweetNewComponent;
  let fixture: ComponentFixture<TweetNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetNewComponent]
    });
    fixture = TestBed.createComponent(TweetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
