import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-new',
  templateUrl: './tweet-new.component.html',
  styleUrls: ['./tweet-new.component.css'],
})
export class TweetNewComponent implements OnInit {
  newTweet: Tweet = new Tweet();

  constructor(private tweetService: TweetService, private router: Router) {}

  ngOnInit(): void {
    this.newTweet.createdAt = new Date();
    let tweeterId: number = 0;
    this.tweetService.getTweeterID().subscribe(
      (id: number) => {
        console.log('Tweeter ID: ', id);
        this.newTweet.tweeterId = id;
      },
      (error: any) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
  }

  addTweet() {
    this.tweetService.createTweet(this.newTweet).subscribe(
      () => {
        window.alert('Created Tweet Successfully');
        this.router.navigate(['tweet']);
      },
      (error) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['signin']);
        }
      }
    );
  }
}
