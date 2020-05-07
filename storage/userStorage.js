// @flow
import { Storeable } from "./storeable"
import UserModel from "../models/user"

export default class UserStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadUser(): UserModel {
    return this.storage.load("user")
  }

  loginUser(user: UserModel) {
    this.storage.save("user", user)
  }

  logoutUser() {
    this.storage.clear()
  }

  isUserLoggedIn(): boolean {
    return this.loadUser() !== null
  }
}
