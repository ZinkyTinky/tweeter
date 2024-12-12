export class Tweet {
  tweetId?: number;
  title?: string;
  createdAt?: Date;
  editedAt?: Date;
  TweetBody?: string;
  TweeterId?: number;

  constructor(
    id?: number,
    title?: string,
    tweetBody?: string,
    createdAt?: Date,
    editedAt?: Date,
    tweeterId?: number
  ) {
    this.tweetId = id;
    this.title = title;
    this.TweetBody = tweetBody;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.TweeterId = tweeterId;
  }
}
