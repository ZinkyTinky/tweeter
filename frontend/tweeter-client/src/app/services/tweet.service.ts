import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  baseURL: string = 'https://localhost:7191/api/tweet';
  tokenKey: string = 'myTweetToken';

  constructor(private http: HttpClient) {}

  getAllTweets() {
    return this.http.get<Tweet[]>(this.baseURL);
  }

  getTweetById(tweetId: number) {
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

  updateTweet(updatedTweet: Tweet) {
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

  deleteTweet(tweetId: string) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    };
    return this.http.delete(`${this.baseURL}/${tweetId}`, {
      headers: reqHeaders,
    });
  }
}
