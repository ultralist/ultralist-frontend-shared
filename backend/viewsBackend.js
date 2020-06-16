// @flow

import { Backendable } from "./backends/backendable"

import ViewModel from "../models/view"

export default class ViewsBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  getViews() {
    return this.backend.apiRequest("api/v1/user/views", "GET", this.token)
  }

  updateView(view: ViewModel) {
    return this.backend.apiRequest(
      `api/v1/user/views/${view.id}`,
      "PUT",
      this.token,
      view.toJSON()
    )
  }

  createView(view: ViewModel) {
    return this.backend.apiRequest(
      "api/v1/user/views",
      "POST",
      this.token,
      view.toJSON()
    )
  }

  deleteView(view: ViewModel) {
    return this.backend.apiRequest(
      `api/v1/user/views/${view.id}`,
      "DELETE",
      this.token,
      view.toJSON()
    )
  }
}
