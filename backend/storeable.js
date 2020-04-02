// @flow
import TodoList from "../models/todoList"

export interface Storeable {
  loadTodoLists(): Array<TodoList>;
  loadTodoList(uuid: string): TodoList;
  saveTodoLists(todoLists: Array<TodoList>): null;
  updateTodoList(todoList: TodoList): null;
}
