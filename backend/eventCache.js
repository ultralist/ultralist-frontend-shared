// @flow
import TodoEvent from "../models/todoEvent"
import { Backendable } from "./backends/backendable"

export default class EventCache {
  cache: Array<TodoEvent>
  backend: Backendable
  token: string

  constructor(backend: Backendable, token: string) {
    const cache = window.localStorage.getItem("eventCache")
    this.cache = cache ? cache : []
    this.backend = backend
    this.token = token
  }

  addItem(event: TodoEvent) {
    this.cache.push(event)
    this.publishEvents()
  }

  toJSON(): Array<Object> {
    return this.cache.map(e => e.toJSON())
  }

  toBackendJSON(): Array<Object> {
    return this.cache.map(e => e.toBackendJSON())
  }

  publishEvents() {
    if (!navigator.onLine) return
    if (this.cache.length === 0) return

    this.backend
      .apiRequest(`api/v1/todo_lists/event_cache`, "PUT", this.token, {
        events: this.toBackendJSON()
      })
      .then(() => {
        this.clear()
      })
  }

  clear() {
    console.log("eventCache clear")
    this.cache = []
  }
}
