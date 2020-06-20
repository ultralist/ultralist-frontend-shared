// @flow
import { Storeable } from "./storeable"

export default class ModalStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  isModalOpen(name: ?string): boolean {
    const modals = this.storage.load("modalsOpen")
    if (!name) {
      if (modals === {}) {
        return false
      }

      return Object.entries(modals).some(m => m[1])
    }
  }

  getModalOpenName(): string {
    const openModal = this.storage.load("modalsOpen").find(m => m.open)
    return openModal ? openModal.name : ""
  }

  setModalIsOpen(open: boolean, name: string) {
    const modals = this.storage.load("modalsOpen") || {}
    modals[name] = open
    this.storage.save("modalsOpen", modals)
  }
}
