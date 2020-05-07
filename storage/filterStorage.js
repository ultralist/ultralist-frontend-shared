// @flow
import { Storeable } from "./storeable"

export default class FilterStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadFilter(): FilterModel {
    this.storage.load("filter")
  }

  saveFilter(filter: FilterModel) {
    this.storage.save("filter", filter)
  }
}
