// @flow

import EventCache from "./eventCache"
import { Backendable } from "./backends/backendable"
import { createTodoListFromBackend } from "../models/todoList"

export default class TodoListBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  fetchTodoLists() {
    return new Promise(resolve => {
      this.backend
        .apiRequest("api/v1/todo_lists", "GET", this.token)
        .then(data => {
          resolve(data.todolists.map(createTodoListFromBackend))
        })
    })
  }

  fetchTodoList(uuid: string) {
    return new Promise(resolve => {
      this.backend
        .apiRequest(`api/v1/todo_lists/${uuid}`, "GET", this.token)
        .then(data => {
          resolve(createTodoListFromBackend(data))
        })
    })
  }

  updateTodoList(todolistUUID: string, cache: EventCache) {
    return new Promise(resolve => {
      this.backend
        .apiRequest(`api/v1/todo_lists/${todolistUUID}`, "PUT", this.token, {
          events: cache.toJSON()
        })
        .then(data => {
          resolve(createTodoListFromBackend(data))
        })
    })
  }

  createTodoList(uuid: string, name: string) {
    return this.backend.apiRequest(`api/v1/todo_lists`, "POST", this.token, {
      todolist: {
        uuid: uuid,
        name
      }
    })
  }
}
