// @flow

import TodoEvent from "../models/todoEvent"

export interface Cacheable {
  addItem(event: TodoEvent): null;
  clear(): null;
  toJSON(): Array<Object>;
}
