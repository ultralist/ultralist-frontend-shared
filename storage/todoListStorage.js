// @flow
import { Storeable } from "./storeable"

import TodoListModel, { createTodoListFromJSON } from "../models/todoList"

export default class TodoListStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadTodoLists(): TodoListModel[] {
    const todolists = this.storage.load("todolists")
    return (todolists || []).map(createTodoListFromJSON)
  }

  loadTodoList(uuid: string): ?TodoListModel {
    return this.loadTodoLists().find(list => list.uuid === uuid)
  }

  loadFirstTodoList(): TodoListModel {
    return this.loadTodoLists()[0]
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
