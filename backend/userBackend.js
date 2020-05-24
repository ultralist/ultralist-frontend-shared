// @flow

import { Backendable } from "./backends/backendable"
import UserModel from "../models/user"

export default class UserBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  updateUser(user: UserModel) {
    return this.backend.apiRequest("api/v1/user", "PUT", this.token, user)
  }

  getUser() {
    return this.backend.apiRequest("/api/v1/user", "GET", this.token)
  }
}
