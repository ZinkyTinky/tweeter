export class Tweet {
  tweetId?: number;
  title?: string;
  createdAt?: Date;
  editedAt?: Date;
  tweetBody?: string;
  tweeterId?: number;

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
    this.tweetBody = tweetBody;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.tweeterId = tweeterId;
  }
}
