// @flow

type ConstructorArgs = {
  id: string,
  name: string,
  archived: ?boolean,
  completed: ?boolean,
  isPriority: ?boolean,
  due: ?string,
  group: ?string,
  subjectContains: ?string
}

export default class View {
  id: string
  name: string
  archived: ?boolean
  completed: ?boolean
  is_priority: ?boolean
  due: ?string
  group: ?string
  subjectContains: ?string

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.name = args.name
    this.archived = args.archived
    this.completed = args.completed
    this.isPriority = args.isPriority
    this.due = args.due
    this.group = args.due
    this.subjectContains = args.subjectContains
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      archived: this.archived,
      completed: this.completed,
      isPriority: this.isPriority,
      due: this.due,
      group: this.group,
      subjectContains: this.subjectContains
    }
  }
}

export const createViewFromBackend = (backendJSON: Object) => {
  return new View({
    id: backendJSON.id,
    name: backendJSON.name,
    archived: backendJSON.archived,
    completed: backendJSON.completed,
    isPriority: backendJSON.is_priority,
    due: backendJSON.due,
    group: backendJSON.group,
    subjectContains: backendJSON.subject_contains
  })
}
