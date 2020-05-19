// @flow

import { Backendable } from "./backends/backendable"

export default class ApiKeysBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  getKeys() {
    return this.backend.apiRequest("api/v1/user/api_keys", "GET", this.token)
  }
}
