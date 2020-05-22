// @flow

import { Backendable } from "./backends/backendable"

import ApiKey from "../models/apiKey"

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

  createKey(key: ApiKey) {
    return this.backend.apiRequest(
      "api/v1/user/api_keys",
      "POST",
      this.token,
      key.toJSON()
    )
  }

  deleteKey(key: ApiKey) {
    return this.backend.apiRequest(
      `api/v1/user/api_keys/${key.id}`,
      "DELETE",
      this.token,
      key.toJSON()
    )
  }
}
