// @flow
import { Storeable } from "./storeable"
import UserModel from "../models/user"
import ReactGA from "react-ga"

export default class UserStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
    const user = this.loadUser()
    if (user) {
      ReactGA.set({
        userId: user.uuid,
        userName: user.name,
        userEmail: user.email,
        status: user.status
      })
    }
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
