export class UserDetail {
  firstName?: string;
  lastName?: string;
  userName?: string;
  tweeterID?: number;
  bio?: string;
  profilePicture?: string;
  following?: string[];

  constructor(
    firstName?: string,
    lastName?: string,
    userName?: string,
    tweeterID?: number,
    bio?: string,
    profilePicture?: string,
    following?: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.tweeterID = tweeterID;
    this.bio = bio;
    this.profilePicture = profilePicture;
    this.following = following;
  }
}
