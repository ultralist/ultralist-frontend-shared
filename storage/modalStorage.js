// @flow
import { Storeable } from "./storeable"

export default class ModalStorage {
  constructor(storage: Storeable) {
    this.storage = storage
  }

  isModalOpen(): boolean {
    return this.storage.load("modalOpen") === "true"
  }

  setModalIsOpen(open: boolean) {
    this.storage.save("modalOpen", open)
  }
}
