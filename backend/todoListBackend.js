// @flow

import EventCache from "./eventCache"
import { Backendable } from "./backends/backendable"
import { Storeable } from "../storage/storeable"
import { createTodoListFromBackend } from "../models/todoList"

export default class TodoListBackend {
  token: string
  backend: Backendable
  storage: Storeable

  constructor(token: string, backend: Backendable, storage: Storeable) {
    this.token = token
    this.backend = backend
    this.storage = storage
  }

  fetchTodoLists() {
    return new Promise(resolve => {
      this.backend
        .apiRequest("api/v1/todo_lists", "GET", this.token)
        .then(data => {
          const lists = data.todolists.map(createTodoListFromBackend)

          this.storage.saveTodoLists(lists)
          resolve(lists)
        })
    })
  }

  fetchTodoList(uuid: string) {
    return new Promise(resolve => {
      this.backend
        .apiRequest(`api/v1/todo_lists/${uuid}`, "GET", this.token)
        .then(data => {
          const list = createTodoListFromBackend(data)
          this.storage.saveTodoList(list)
          resolve(list)
        })
    })
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
}
