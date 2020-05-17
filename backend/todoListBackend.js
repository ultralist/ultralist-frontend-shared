// @flow

import EventCache from "./eventCache"
import Backendable from "./backends/backendable"

export default class TodoListBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  fetchTodoLists() {
    console.log("fetchTodoLists with token ", this.token)
    return this.backend.apiRequest("api/v1/todo_lists", "GET", this.token)
  }

  fetchTodoList(uuid: string) {
    return this.backend.apiRequest(
      `api/v1/todo_lists/${uuid}`,
      "GET",
      this.token
    )
  }

  updateTodoList(todolistUUID: string, cache: EventCache) {
    return this.backend.apiRequest(
      `api/v1/todo_lists/${todolistUUID}`,
      "PUT",
      this.token,
      {
        events: cache.toJSON()
      }
    )
  }

  createTodoList(uuid: string, name: string) {
    return this.backend.apiRequest(`api/v1/todo_lists`, "POST", this.token, {
      todolist: {
        uuid: uuid,
        name
      }
    })
  }

  updateUser(user: UserModel, stripeToken: string) {
    return this.backend.apiRequest("api/v1/user", "PUT", this.token, {
      stripe_token: stripeToken,
      user
    })
  }
}
