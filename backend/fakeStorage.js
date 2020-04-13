// @flow

import { LocalStoreable } from "./localStoreable"

export default class FakeStorage implements LocalStoreable {
  storage: Object

  constructor() {
    this.storage = {}
  }

  load(key: string) {
    return this.storage[key]
  }

  save(key: string, value: any) {
    this.storage[key] = value
  }

  dump() {
    return this.storage
  }
}
