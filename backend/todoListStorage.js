// @flow
import { LocalStoreable } from "./localStoreable"

import TodoListModel from "../models/todoList"

export default class TodoListStorage {
  storage: LocalStoreable

  constructor(storage: LocalStoreable) {
    this.storage = storage
  }

  loadTodoList(uuid: string): ?TodoListModel {
    return this.storage.load("todolists").find((list) => list.uuid === uuid)
  }

  loadFirstTodoList(): TodoListModel {
    return this.storage.load("todolists")[0]
  }

  saveTodoList(todoList: TodoListModel) {
    const lists = this.storage.load("todoLists")
    const index = lists.map((l) => l.uuid).indexOf(todoList.uuid)
    lists[index] = todoList
    this.storage.save("todoLists", lists)
  }
}
