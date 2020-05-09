// @flow
import { Storeable } from "./storeable"

export default class BrowserStorage implements Storeable {
  load(key: string) {
    return JSON.parse(window.localStorage.getItem(key))
  }

  save(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  clear() {
    window.localStorage.clear()
  }
}
