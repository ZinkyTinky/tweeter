import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet-new',
  templateUrl: './tweet-edit.component.html',
  styleUrls: ['./tweet-edit.component.css'],
})
export class TweetEditComponent implements OnInit {
  ExistingTweet: Tweet = new Tweet();

  constructor(
    private TweetService: TweetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.TweetService.getTweetById(Number(id)).subscribe(
          (tweet: Tweet) => {
            this.ExistingTweet = tweet;
          },
          (error) => {
            console.log('Error: ', error);
            if (error.status === 401 || error.status === 403) {
              this.router.navigate(['signin']);
            }
          }
        );
      }
    });
  }

  onSubmit(): void {
    this.TweetService.updateTweet(this.ExistingTweet).subscribe(
      () => {
        window.alert('Updated Tweet Successfully');
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
