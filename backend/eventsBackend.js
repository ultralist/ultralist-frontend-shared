// @flow

import EventCache from "./eventCache"
import { Backendable } from "./backends/backendable"

export default class EventsBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  publishEvents(cache: EventCache) {
    return this.backend.apiRequest(
      `api/v1/todo_lists/event_cache`,
      "PUT",
      this.token,
      {
        events: cache.toBackendJSON()
      }
    )
  }
}
