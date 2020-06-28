// @flow
import TodoItem from "./todoItem"
import utils from "../utils"

type ConstructorArgs = {
  name: string,
  todos: Array<TodoItem>
}

export default class TodoListGroup {
  name: string
  uuid: string
  todos: Array<TodoItem>

  constructor(args: ConstructorArgs) {
    this.name = args.name
    this.uuid = utils.generateUuid()
    this.todos = args.todos
  }

  sortedTodos(): Array<TodoItem> {
    const sorted = []

    // add prioritized, uncompleted, unarchived todos with a due date first
    sorted.push(
      this.todos
        .filter(
          t =>
            t.isPriority && !t.archived && !t.completed && t.dueDate() !== null
        )
        .sort((t1, t2) => (t1.dueDate() < t2.dueDate() ? -1 : 1))
    )

    // add prioritized, uncompleted, unarchived todos due someday
    sorted.push(
      this.todos
        .filter(
          t =>
            t.isPriority && !t.archived && !t.completed && t.dueDate() === null
        )
        .sort((t1, t2) => (t1.subject < t2.subject ? -1 : 1))
    )

    // then the uncompleted, unarchived todos that have a due date, sorted by due date
    sorted.push(
      this.todos
        .filter(
          t =>
            !t.isPriority && !t.archived && !t.completed && t.dueDate() !== null
        )
        .sort((t1, t2) => (t1.dueDate() < t2.dueDate() ? -1 : 1))
    )

    // then the uncompleted, unarchived someday todos
    sorted.push(
      this.todos
        .filter(
          t =>
            !t.isPriority && !t.archived && !t.completed && t.dueDate() === null
        )
        .sort((t1, t2) => (t1.subject < t2.subject ? -1 : 1))
    )

    // then the archived or completed todos without a due date
    sorted.push(
      this.todos
        .filter(t => (t.archived || t.completed) && t.dueDate() !== null)
        .sort((t1, t2) => (t1.dueDate() < t2.dueDate() ? -1 : 1))
    )

    sorted.push(
      this.todos
        .filter(t => (t.archived || t.completed) && t.dueDate() === null)
        .sort((t1, t2) => (t1.subject < t2.subject ? -1 : 1))
    )

    return sorted.flat()
  }
}
