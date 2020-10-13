// @flow
type TodoEvents = "EventAdded" | "EventDeleted" | "EventUpdated"
type ObjectTypes = "TodoItem" | "TodoList"

export default class TodoEvent {
  object: Object
  eventType: TodoEvents
  objectType: ObjectTypes

  constructor(eventType: TodoEvents, objectType: ObjectTypes, object: Object) {
    this.eventType = eventType
    this.object = object
    this.objectType = objectType
  }

  toJSON() {
    return {
      eventType: this.eventType,
      objectType: this.objectType,
      object: this.object.toJSON()
    }
  }

  toBackendJSON() {
    return {
      event_type: this.eventType,
      object_type: this.objectType,
      object: this.object.toBackendJSON()
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
