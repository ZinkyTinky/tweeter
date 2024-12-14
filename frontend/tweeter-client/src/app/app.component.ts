import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';
import { TweetService } from './services/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tweeter-client';

  constructor(private tweetService: TweetService) {}

  ngOnInit() {
    // Initialization logic here
  }

  signOut() {
    localStorage.removeItem('myTweetToken');
  }

  isLoggedIn() {
    return localStorage.getItem('myTweetToken') !== null;
  }

  getTweeterUserName() {
    const token = localStorage.getItem('myTweetToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.username;
    }
    return '';
  }

  getTweeterId() {
    var tokenKey = 'myTweetToken';
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      return 0;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;
  }
}
