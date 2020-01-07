export default class User {
  static from(token, username, email) {
    if (token == null) {
      return null;
    }

    return new User(username, email);
  }

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
}
