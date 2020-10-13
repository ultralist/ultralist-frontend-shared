// @flow
import TodoEvent from "../models/todoEvent"

export default class EventCache {
  cache: Array<TodoEvent>

  constructor() {
    const cache = window.localStorage.getItem("eventCache")
    this.cache = cache ? cache : []
  }

  addItem(event: TodoEvent) {
    this.cache.push(event)
  }

  toJSON(): Array<Object> {
    return this.cache.map(e => e.toJSON())
  }

  toBackendJSON(): Array<Object> {
    return this.cache.map(e => e.toBackendJSON())
  }

  clear() {
    this.cache = []
  }
}
