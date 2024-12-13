import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tweeter-client';

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
}
