// @flow

import { Backendable } from "./backends/backendable"
import UserModel, { createUserFromBackend } from "../models/user"

export default class UserBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  updateUser(user: UserModel) {
    return this.backend.apiRequest("api/v1/user", "PUT", this.token, {
      user: { time_zone: user.timeZone, name: user.name }
    })
  }

  deleteUser(user: UserModel) {
    return this.backend.apiRequest(
      `api/v1/users/${user.uuid}`,
      "DELETE",
      this.token
    )
  }

  getUser() {
    return new Promise(resolve => {
      return this.backend
        .apiRequest("/api/v1/user", "GET", this.token)
        .then(data => {
          resolve(createUserFromBackend(data))
        })
    })
  }
}
