export class User {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  tweeterID?: number;
  bio?: string;
  profilePicture?: string;
  following?: string[];

  constructor(
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    tweeterID?: number,
    bio?: string,
    profilePicture?: string,
    following?: string[]
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.tweeterID = tweeterID;
    this.bio = bio;
    this.profilePicture = profilePicture;
    this.following = following;
  }
}
