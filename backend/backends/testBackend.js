// @flow

import { todoData } from "../test/test_helper"
import EventCache from "./eventCache"
import Backendable from "./backendable"

export default class TestBackend implements Backendable {
  token: string

  constructor(token: string) {
    this.token = token
  }

  apiRequest(path: string, method: string, params: object = {}) {
    return new Promise(resolve => resolve(params))
  }
}
