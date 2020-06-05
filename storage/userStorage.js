// @flow
import { Storeable } from "./storeable"
import UserModel from "../models/user"
import ReactGA from "react-ga"

export default class UserStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadUser(): ?UserModel {
    const user = this.storage.load("user")
    if (user) return new UserModel(user)
    return null
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

  getCLIAuth(): boolean {
    return this.storage.load("cliAuth")
  }

  setCLIAuth(cliAuth: boolean) {
    this.storage.save("cliAuth", cliAuth)
  }

  getSignup(): boolean {
    return this.storage.load("isSignup")
  }

  setSignup(signup: boolean) {
    this.storage.save("isSignup", signup)
  }
}
