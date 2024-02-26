import { getLocalStorage, setLocalStorage, keys } from "../helpers.mjs";

export class UserAuth {
  constructor() {
    this.allUsers = getLocalStorage(keys.USERS) || [];
  }

  _isUserExist(user) {
    return this.allUsers.find((u) => u.email !== user.email);
  }

  _isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmailValid = emailRegex.test(email);

    return isEmailValid;
  }

  _isValidPassword(password) {
    // minimum 8 letters, 1 letter, 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isPasswordValid = passwordRegex.test(password);
    console.log({ isPasswordValid });

    return isPasswordValid;
  }

  validateUser({ name, email, password }) {
    if (!!this._isUserExist(email)) return new Error("User already exist.");
    if (!this._isValidEmail(email)) return new Error("Invalid email provided.");
    if (!this._isValidPassword(password))
      return new Error(
        "Password must contain atleast 8 letters including atleast one letter and number."
      );

    return { id: Date.now(), name, email, password };
  }

  saveUser(user) {
    this.allUsers.push(user);
    setLocalStorage(keys.USERS, this.allUsers);
  }

  login({ email, password }) {
    const userExist = this._isUserExist(email);
    if (!userExist) return new Error(`This email doesn't exist.`);
    if (userExist.password !== password)
      return new Error(`Invalid password provided.`);

    return userExist;
  }
}
