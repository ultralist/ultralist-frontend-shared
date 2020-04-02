// @flow
import TodoEvent from "../models/todoEvent"
import { Cacheable } from "./cacheable"

export default class EventCache implements Cacheable {
  cache: Array<TodoEvent>

  constructor() {
    const cache = window.localStorage.getItem("eventCache")
    this.cache = cache ? cache : []
  }

  addItem(event: TodoEvent) {
    this.cache.push(event)
    // window.localStorage.setItem("eventCache", this.cache)
    return null
  }

  toJSON(): Array<Object> {
    return this.cache.map(e => e.toJSON())
  }

  clear() {
    this.cache = []
    // window.localStorage.setItem("eventCache", this.cache)
    return null
  }
}
