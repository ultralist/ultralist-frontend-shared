// @flow

import TodoList from "../models/todoList"
import FilterModel from "../models/filter"

export interface LocalStoreable {
  loadTodoLists(): Array<TodoList>;
  loadTodoList(uuid: string): ?TodoList;
  saveTodoLists(todoLists: Array<TodoList>): ?null;
  updateTodoList(todoList: TodoList): ?null;
  loadFilter(): FilterModel;
  saveFilter(filter: FilterModel): ?null;
}
