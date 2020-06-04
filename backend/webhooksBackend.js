// @flow

import { Backendable } from "./backends/backendable"

import Webhook from "../models/webhook"

export default class ApiKeysBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  getWebhooks() {
    return this.backend.apiRequest("api/v1/user/webhooks", "GET", this.token)
  }

  updateWebhook(webhook: Webhook) {
    return this.backend.apiRequest(
      `api/v1/user/webhooks/${webhook.id}`,
      "PUT",
      this.token,
      webhook.toJSON()
    )
  }

  testWebhook(webhook: Webhook) {
    return this.backend.apiRequest(
      `api/v1/user/webhooks/${webhook.id}/test`,
      "POST",
      this.token
    )
  }

  createWebhook(webhook: Webhook) {
    return this.backend.apiRequest(
      "api/v1/user/webhooks",
      "POST",
      this.token,
      webhook.toJSON()
    )
  }

  deleteWebhook(webhook: Webhook) {
    return this.backend.apiRequest(
      `api/v1/user/webhooks/${webhook.id}`,
      "DELETE",
      this.token,
      webhook.toJSON()
    )
  }
}
