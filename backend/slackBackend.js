// @flow

import { Backendable } from "./backends/backendable"

export default class SlackBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  exchangeCodeForToken(code: string) {
    return this.backend.apiRequest(
      "api/v1/slack/authorize_with_code",
      "PUT",
      this.token,
      {
        code: code
      }
    )
  }
}
