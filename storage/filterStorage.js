// @flow
import { Storeable } from "./storeable"
import FilterModel from "../models/filter"

export default class FilterStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  loadFilter(): FilterModel {
    return new FilterModel(this.storage.load("filter") || {})
  }

  saveFilter(filter: FilterModel) {
    this.storage.save("filter", filter)
  }
}
