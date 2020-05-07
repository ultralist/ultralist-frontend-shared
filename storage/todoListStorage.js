// @flow
import { Storeable } from "./storeable"

import TodoListModel from "../models/todoList"

export default class TodoListStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadTodoList(uuid: string): ?TodoListModel {
    return this.storage.load("todolists").find(list => list.uuid === uuid)
  }

  loadFirstTodoList(): TodoListModel {
    return this.storage.load("todolists")[0]
  }

  saveTodoList(todoList: TodoListModel) {
    const lists = this.storage.load("todolists")
    const index = lists.map(l => l.uuid).indexOf(todoList.uuid)
    lists[index] = todoList
    this.storage.save("todolists", lists)
  }

  saveTodoLists(todoLists: TodoListModel[]) {
    this.storage.save("todolists", todoLists)
  }
}
