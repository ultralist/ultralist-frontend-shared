// @flow
import TodoList, { createTodoListFromJSON } from "../models/todoList"
import { LocalStoreable } from "./localStoreable"
import { todoData } from "../fakeData"
import utils from "../utils"

export default class FakeStorage implements LocalStoreable {
  todoLists: Array<TodoList>
  filter: ?FilterModel

  loadTodoLists() {
    this.todoLists = []

    const todoList = new TodoList({
      name: "Test list",
      uuid: utils.generateUuid(),
      todos: todoData,
    })
    this.todoLists.push(todoList)

    return this.todoLists
  }

  loadTodoList(uuid: string): ?TodoList {
    return this.loadTodoLists().find((list) => list.uuid === uuid)
  }

  saveTodoLists(todoLists: Array<TodoList>) {
    this.todoLists = todoLists
  }

  updateTodoList(todoList: TodoList) {
    const lists = this.loadTodoLists()
    const index = lists.map((l) => l.uuid).indexOf(todoList.uuid)
    lists[index] = todoList
    this.saveTodoLists(lists)
  }

  loadFilter() {
    if (!this.filter) {
      this.filter = new FilterModel()
    }
    return this.filter
  }

  saveFilter(filter: FilterModel) {
    this.filter = filter
  }
}
