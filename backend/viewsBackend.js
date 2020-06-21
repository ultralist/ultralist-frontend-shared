// @flow

import { Backendable } from "./backends/backendable"

import FilterModel from "../models/filter"

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

  updateView(view: FilterModel) {
    return this.backend.apiRequest(
      `api/v1/user/views/${view.id}`,
      "PUT",
      this.token,
      {
        view: {
          subject_contains: view.subjectContains,
          archived: view.archived,
          is_priority: view.isPriority,
          completed: view.completed,
          due: view.due,
          name: view.name,
          is_default: view.isDefault,
          group: view.group
        }
      }
    )
  }

  createView(view: FilterModel) {
    return this.backend.apiRequest("api/v1/user/views", "POST", this.token, {
      view: {
        name: view.name,
        archived: view.archived,
        completed: view.completed,
        is_priority: view.isPriority,
        due: view.due,
        group: view.group,
        subject_contains: view.subjectContains
      }
    })
  }

  deleteView(view: FilterModel) {
    return this.backend.apiRequest(
      `api/v1/user/views/${view.id}`,
      "DELETE",
      this.token
    )
  }
}
