// @flow

import { Storeable } from "./storeable"

export default class FakeStorage implements Storeable {
  storage: Object

  constructor() {
    this.clear()
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

  clear() {
    this.storage = {}
  }
}
