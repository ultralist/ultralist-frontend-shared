// @flow

import { Backendable } from "./backends/backendable"
import UserModel, { createUserFromBackend } from "../models/user"

export default class UserBackend {
  token: string
  backend: Backendable
  storage: Storeable

  constructor(token: string, backend: Backendable, storage: Storeable) {
    this.token = token
    this.backend = backend
    this.storage = storage
  }

  updateUser(user: UserModel) {
    return this.backend.apiRequest("api/v1/user", "PUT", this.token, user)
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
          const user = createUserFromBackend(data)
          this.storage.loginUser(user)
          resolve(user)
        })
    })
  }
}
