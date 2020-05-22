// @flow
import { Storeable } from "./storeable"

export default class ModalStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  isModalOpen(name: ?string): boolean {
    if (!name) {
      return this.storage.load("modalOpen") === true
    }

    return (
      this.storage.load("modalOpen") === true &&
      this.storage.load("modalOpenName") === name
    )
  }

  getModalOpenName(): string {
    return this.storage.load("getModalOpenName")
  }

  setModalIsOpen(open: boolean, name: string) {
    this.storage.save("modalOpen", open)
    this.storage.save("modalOpenName", open ? name : null)
  }
}
