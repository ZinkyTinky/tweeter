import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../models/tweet';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  baseURL: string = 'https://localhost:7191/api/tweet';
  tokenKey: string = 'myTweetToken';

  constructor(private http: HttpClient) {}

  getAllTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.baseURL);
  }

  getTweetById(tweetId: number): Observable<Tweet> {
    return this.http.get<Tweet>(`${this.baseURL}/${tweetId}`);
  }

  getTweetByTitle(tweetTitle: string) {
    return this.http.get<Tweet>(`${this.baseURL}/title/${tweetTitle}`);
  }

  createTweet(newTweet: Tweet) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    };
    return this.http.post(this.baseURL, newTweet, { headers: reqHeaders });
  }

  updateTweet(updatedTweet: Tweet): Observable<Tweet> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    };
    return this.http.put(
      `${this.baseURL}/${updatedTweet.tweetId}`,
      updatedTweet,
      {
        headers: reqHeaders,
      }
    );
  }

  deleteTweet(tweetId: string): Observable<void> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    };
    return this.http.delete<void>(`${this.baseURL}/${tweetId}`, {
      headers: reqHeaders,
    });
  }

  getTweeterID() {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      throw new Error('Token not found');
    }
    const decodedToken: any = jwtDecode(token);
    return of(decodedToken.sub); // Wrapping the value in an observable
  }
}
