// @flow
import { Storeable } from "./storeable"
import UserModel from "../models/user"

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

  saveUser(user: UserModel) {
    this.storage.save("user", user)
  }

  loginUser(user: UserModel) {
    this.saveUser(user)
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

  getCLIAuthCompleted(): boolean {
    return this.storage.load("cliAuthCompleted")
  }

  setCLIAuthCompleted(cliAuth: boolean) {
    this.storage.save("cliAuthCompleted", cliAuth)
  }

  getSignup(): boolean {
    return this.storage.load("isSignup")
  }

  setSignup(signup: boolean) {
    this.storage.save("isSignup", signup)
  }

  getSlackAppInstalled(): boolean {
    return this.storage.load("slackAppInstalled")
  }

  setSlackAppInstalled(slackAppInstalled: boolean) {
    this.storage.save("slackAppInstalled", slackAppInstalled)
  }

  setSlackCode(code: string) {
    this.storage.save("slackCode", code)
  }

  getSlackCode(): string {
    return this.storage.load("slackCode")
  }
}
