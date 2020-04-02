// @flow

import { todoData } from "../fakeData"
import Cacheable from "./cacheable"
import utils from "../utils"

const todoList = {
  name: "test list",
  todo_items_attributes: todoData,
  uuid: utils.generateUuid()
}

export default class TestBackend {
  token: string

  constructor(token: string) {
    this.token = token
  }

  fetchTodoList(uuid: string) {
    return new Promise(resolve => resolve(todoList))
  }

  updateTodoList(uuid: string, cache: Cacheable) {
    return new Promise(resolve => resolve(todoList))
  }

  createTodoList(uuid: string, name: string) {
    return new Promise(resolve => resolve(todoList))
  }

  fetchTodoLists() {
    return new Promise(resolve => {
      resolve([todoList])
    })
  }
}
