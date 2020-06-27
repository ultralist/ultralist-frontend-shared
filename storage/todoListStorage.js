// @flow
import { Storeable } from "./storeable"

import TodoListModel, { createTodoListFromJSON } from "../models/todoList"

export default class TodoListStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  setMostRecentTodoList(uuid: string) {
    this.storage.save("most_recent_todolist_id", uuid)
  }

  loadMostRecentTodoList(): ?TodoListModel {
    const mrt = this.loadTodoLists().find(
      t => t.uuid === this.storage.load("most_recent_todolist_id")
    )
    return mrt || this.loadFirstTodoList()
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
