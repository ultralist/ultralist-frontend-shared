// @flow
import { Storeable } from "./storeable"

export default class FeatureStorage {
  features: any

  constructor(storage: Storeable) {
    this.storage = storage
  }

  features() {
    return this.storage.load("features") || {}
  }

  enableFeature(feature: string) {
    const features = this.features()
    features[feature] = true
    this.storage.save("features", features)
  }

  isFeatureEnabled(feature: string) {
    return this.features()[feature] === true
  }
}
