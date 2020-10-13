// @flow
import TodoItemModel, { createTodoItemFromBackend } from "./todoItem"
import FilterModel, { createFilterFromBackend } from "./filter"
import TodoEvent from "./todoEvent"
import utils from "../utils"
import EventCache from "../backend/eventCache"

type ConstructorArgs = {
  name?: string,
  uuid?: string,
  updatedAt?: Date,
  todos?: Array<TodoItemModel>,
  views?: Array<FilterModel>
}

export default class TodoList {
  name: string
  uuid: string
  updatedAt: Date
  todos: Array<TodoItemModel>
  views: Array<FilterModel>
  eventCache: EventCache

  constructor(args: ConstructorArgs) {
    this.name = args.name || "New List"
    this.uuid = args.uuid || utils.generateUuid()
    this.updatedAt = args.updatedAt
    this.todos = args.todos || []
    this.views = args.views.map(v => new FilterModel(v))
    this.eventCache = args.eventCache
  }

  addTodo(todo: TodoItemModel) {
    todo.id = findLowestUnusedID(this.todos)
    this.todos.push(todo)
    this.eventCache.addItem(new TodoEvent("EventAdded", "TodoItem", todo))
  }

  updateTodo(todo: TodoItemModel) {
    this.todos = this.todos.filter(t => t.uuid !== todo.uuid)
    this.todos.push(todo)
    this.eventCache.addItem(new TodoEvent("EventUpdated", "TodoItem", todo))
  }

  deleteTodo(todo: TodoItemModel) {
    this.todos = this.todos.filter(t => t.uuid !== todo.uuid)
    this.eventCache.addItem(new TodoEvent("EventDeleted", "TodoItem", todo))
  }

  setName(name: string): void {
    this.name = name
    this.eventCache.addItem(new TodoEvent("EventUpdated", "TodoList", this))
  }

  defaultView(): FilterModel {
    return this.views.filter(v => v.isDefault)[0] || new FilterModel({})
  }

  viewChanged(view: FilterModel): boolean {
    const savedView = this.views.find(v => v.id === view.id)
    return savedView === undefined || !savedView.equals(view)
  }

  toJSON() {
    return {
      name: this.name,
      uuid: this.uuid,
      updatedAt: this.updatedAt,
      todos: this.todos.map(todo => new TodoItemModel(todo).toJSON()),
      views: this.views.map(v => new FilterModel(v).toJSON())
    }
  }

  toBackendJSON() {
    return {
      name: this.name,
      uuid: this.uuid,
      updated_at: this.updated_at,
      todos: this.todos.map(todo => new TodoItemModel(todo).toBackendJSON()),
      views: this.views.map(v => new FilterModel(v).toBackendJSON())
    }
  }
}

export const findLowestUnusedID = (todos: Array<TodoItemModel>) => {
  if (todos.length === 0) return 1

  const todoIds = todos.map(t => t.id || -1)
  const maxId = Math.max(...todoIds)

  for (let i = 1; i < maxId; i++) {
    if (i !== -1 && !todoIds.includes(i)) {
      return i
    }
  }
  return maxId + 1
}

export const createTodoListFromBackend = (backendJSON: Object) => {
  return new TodoList({
    name: backendJSON.name,
    todos: backendJSON.todo_items_attributes.map(createTodoItemFromBackend),
    views: backendJSON.views.map(createFilterFromBackend),
    updatedAt: backendJSON.updated_at,
    uuid: backendJSON.uuid
  })
}

export const createTodoListFromJSON = (storageJSON: Object) => {
  return new TodoList({
    name: storageJSON.name,
    todos: storageJSON.todos.map(i => new TodoItemModel(i)),
    views: storageJSON.views.map(f => new FilterModel(f)),
    updatedAt: storageJSON.updatedAt,
    uuid: storageJSON.uuid
  })
}
