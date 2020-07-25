// @flow
import utils from "../utils"
import { format, addDays, setDay, parseISO } from "date-fns"

type ConstructorArgs = {
  id?: number,
  uuid?: string,
  completed?: boolean,
  archived?: boolean,
  contexts?: Array<string>,
  projects?: Array<string>,
  isPriority?: boolean,
  completedDate?: string | null,
  subject?: string,
  status?: string,
  due?: string | null,
  notes?: Array<string>
}

export default class TodoItem {
  id: number | null
  uuid: string
  completed: boolean
  archived: boolean
  isPriority: boolean
  completedDate: string | null
  subject: string
  contexts: Array<string>
  projects: Array<string>
  status: ?string
  due: string | null
  notes: Array<string>

  constructor(args: ConstructorArgs) {
    this.id = args.id || null
    this.uuid = args.uuid || utils.generateUuid()
    this.completed = args.completed || false
    this.archived = args.archived || false
    this.isPriority = args.isPriority || false
    this.completedDate = args.completedDate || null
    this.setSubject(args.subject || "")
    this.due = args.due || null
    this.status = args.status || null
    this.notes = args.notes || []
  }

  dueDate(): Date | null {
    return this.due ? parseISO(this.due || "") : null
  }

  setDue(date: Date | null) {
    if (date === null) {
      this.due = null
    } else {
      this.due = format(date, "yyyy-MM-dd")
    }
  }

  toggleCompleted() {
    this.completed = !this.completed

    if (this.completed) {
      this.completedDate = format(new Date(), "yyyy-MM-dd")
      this.status = "completed"
    } else {
      this.completedDate = null
      this.status = null
    }
  }

  togglePriority() {
    this.isPriority = !this.isPriority
  }

  toggleArchived() {
    this.archived = !this.archived
  }

  setDueToday() {
    this.due = format(new Date(), "yyyy-MM-dd")
  }

  setDueTomorrow() {
    this.due = format(addDays(new Date(), 1), "yyyy-MM-dd")
  }

  setDueMonday() {
    let monday = setDay(new Date(), 1)
    if (monday < new Date()) monday = addDays(monday, 7)
    this.due = format(monday, "yyyy-MM-dd")
  }

  setSubject(subject: string) {
    this.subject = subject
    this.projects = []
    this.contexts = []

    subject.split(" ").forEach(word => {
      if (word.startsWith("+") && word !== "+")
        this.projects.push(word.substring(1))
      if (word.startsWith("@") && word !== "@")
        this.contexts.push(word.substring(1))
    })
  }

  setStatus(status: string) {
    if (
      (status === "completed" && !this.completed) ||
      (status !== "completed" && this.completed)
    ) {
      this.toggleCompleted()
    }
    this.status = status
  }

  deleteNote(note: string) {
    this.notes = this.notes.filter(n => n !== note)
  }

  toJSON() {
    return {
      id: this.id,
      uuid: this.uuid,
      completed: this.completed,
      archived: this.archived,
      isPriority: this.isPriority,
      completedDate: this.completedDate,
      subject: this.subject,
      contexts: this.contexts,
      projects: this.projects,
      status: this.status,
      due: this.due,
      notes: this.notes
    }
  }
}
