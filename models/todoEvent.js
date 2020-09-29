// @flow
type TodoEvents = "EventAdded" | "EventDeleted" | "EventUpdated"
type ObjectTypes = "TodoItem" | "TodoList"

export default class TodoEvent {
  object: Object
  eventType: TodoEvents
  objectType: ObjectTypes

  constructor(eventType: TodoEvents, object: Object, objectType: ObjectTypes) {
    this.eventType = eventType
    this.object = object
    this.objectType = objectType
  }

  toJSON() {
    return {
      eventType: this.eventType,
      objectType: this.objectType,
      object: this.object
    }
  }
}

export const createAddEvent = (object: Object, objectType: ObjectTypes) => {
  return new TodoEvent("EventAdded", object, objectType)
}

export const createUpdateEvent = (object: Object, objectType: ObjectTypes) => {
  return new TodoEvent("EventUpdated", object, objectType)
}

export const createDeleteEvent = (object: Object, objectType: ObjectTypes) => {
  return new TodoEvent("EventDeleted", object, objectType)
}
