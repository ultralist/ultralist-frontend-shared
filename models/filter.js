// @flow
import TodoItemModel from "./todoItem"
import TodoListGroup from "./todoListGroup"

import filterTodos from "./logic/filterTodos"
import { applyGrouping, applyKanbanGrouping } from "./logic/grouper"

type ConstructorArgs = {
  subjectContains?: string,
  id: string,
  isDefault: boolean,
  name: string,
  archived?: boolean,
  isPriority?: boolean,
  completed?: boolean,
  due?: string,
  group?: string,
  filterString?: string,
  kanbanColumnsString: string,
  todoListUUID: string
}

export default class Filter {
  subjectContains: ?string
  id: ?string
  isDefault: boolean
  name: ?string
  archived: ?boolean
  isPriority: ?boolean
  completed: ?boolean
  due: ?string
  group: ?string
  kanbanColumnsString: string
  todoListUUID: string

  constructor(args: ConstructorArgs) {
    this.subjectContains = args.subjectContains || null
    this.archived = args.archived || null
    this.isPriority = args.isPriority || null
    this.completed = args.completed || null
    this.id = args.id || null
    this.due = args.due || null
    this.name = args.name || null
    this.group = args.group || null
    this.isDefault = args.isDefault || null
    this.todoListUUID = args.todoListUUID

    if (args.kanbanColumnsString) {
      this.kanbanColumnsString = args.kanbanColumnsString
    } else {
      this.setKanbanColumns(["none"])
    }

    if (args.isPriority === undefined) {
      this.isPriority = null
    } else {
      this.isPriority = args.isPriority
    }

    if (args.completed === undefined) {
      this.completed = null
    } else {
      this.completed = args.completed
    }

    if (args.archived === undefined) {
      this.archived = null
    } else {
      this.archived = args.archived
    }
  }

  toggleCompleted() {
    if (this.completed) {
      this.completed = !this.completed
      return
    }
    this.completed = true
  }

  toggleUseCompleted() {
    if (this.completed === null) {
      this.completed = false
    } else {
      this.completed = null
    }
  }

  toggleIsPriority() {
    if (this.isPriority) {
      this.isPriority = !this.isPriority
      return
    }
    this.isPriority = true
  }

  toggleUseIsPriority() {
    if (this.isPriority === null) {
      this.isPriority = false
    } else {
      this.isPriority = null
    }
  }

  toggleArchived() {
    if (this.archived) {
      this.archived = !this.archived
      return
    }
    this.archived = true
  }

  toggleUseArchived() {
    if (this.archived === null) {
      this.archived = false
    } else {
      this.archived = null
    }
  }

  addSubjectContains(s: string) {
    if (this.subjectContains) {
      this.subjectContains += ` ${s}`
    } else {
      this.subjectContains = s
    }
  }

  applyFilter(todos: Array<TodoItemModel>): Array<TodoItemModel> {
    return filterTodos(todos, this)
  }

  applyGrouping(
    todos: Array<TodoItemModel>,
    grouping: ?string
  ): Array<TodoListGroup> {
    return grouping
      ? applyGrouping(todos, grouping)
      : applyGrouping(todos, this.group)
  }

  kanbanColumns(): string[] {
    return JSON.parse(this.kanbanColumnsString)
  }

  setKanbanColumns(columns: string[]): void {
    this.kanbanColumnsString = JSON.stringify(columns)
  }

  applyKanbanGrouping(todos: Array<TodoItemModel>) {
    return applyKanbanGrouping(todos, this.kanbanColumns())
  }

  toFilterStrings(): Array<string> {
    const str = []
    if (this.subjectContains) str.push(this.subjectContains)

    if (this.archived === true) str.push("is:archived")
    if (this.archived === false) str.push("not:archived")

    if (this.isPriority === true) str.push("is:priority")
    if (this.isPriority === false) str.push("not:priority")

    if (this.completed === true) str.push("is:completed")
    if (this.completed === false) str.push("not:completed")

    if (this.due !== null) str.push(`due:${this.due}`)

    if (this.group !== null && this.group !== "all")
      str.push(`group:${this.group}`)

    return str
  }

  removeFilterString(str: string) {
    switch (true) {
      case str === "is:archived" || str === "not:archived":
        this.archived = null
        break
      case str == "is:priority" || str === "not:priority":
        this.isPriority = null
        break
      case str === "is:completed" || str === "not:completed":
        this.completed = null
        break
      case str.startsWith("due:"):
        this.due = null
        break
      case str.startsWith("group:"):
        this.group = "all"
        break
      default:
        this.subjectContains = null
    }
  }

  isEmpty() {
    const isBlank = attr => {
      return attr === null || attr === false || attr === ""
    }

    return (
      isBlank(this.subjectContains) &&
      isBlank(this.archived) &&
      isBlank(this.isPriority) &&
      isBlank(this.completed) &&
      isBlank(this.due) &&
      isBlank(this.name) &&
      isBlank(this.isDefault) &&
      isBlank(this.group)
    )
  }

  toJSON() {
    return {
      subjectContains: this.subjectContains,
      id: this.id,
      archived: this.archived,
      isPriority: this.isPriority,
      completed: this.completed,
      due: this.due,
      name: this.name,
      isDefault: this.isDefault,
      group: this.group,
      kanbanColumnsString: this.kanbanColumnsString,
      todoListUUID: this.todoListUUID
    }
  }

  toBackendJSON() {
    return {
      subject_contains: this.subjectContains,
      id: this.id,
      archived: this.archived,
      is_priority: this.isPriority,
      completed: this.completed,
      due: this.due,
      name: this.name,
      is_default: this.isDefault,
      group: this.group,
      kanban_columns: this.kanbanColumnsString,
      todo_list_uuid: this.todoListUUID
    }
  }

  equals(other: Filter) {
    return (
      this.archived === other.archived &&
      this.isPriority === other.isPriority &&
      this.completed === other.completed &&
      this.due === other.due &&
      this.group === other.group &&
      this.kanbanColumnsString === other.kanbanColumnsString
    )
  }
}

export const createFilterFromBackend = (backendJSON: Object) => {
  return new Filter({
    id: backendJSON.id,
    name: backendJSON.name,
    archived: backendJSON.archived,
    completed: backendJSON.completed,
    isPriority: backendJSON.is_priority,
    due: backendJSON.due,
    group: backendJSON.group,
    isDefault: backendJSON.is_default,
    subjectContains: backendJSON.subject_contains,
    kanbanColumnsString: backendJSON.kanban_columns,
    todoListUUID: backendJSON.todo_list_uuid
  })
}
