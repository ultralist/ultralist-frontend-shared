// @flow

type ConstructorArgs = {
  id: string,
  name: string,
  url: string,
  enabled: boolean,
  failureCount: number
}

export default class ApiKey {
  id: string
  name: string
  url: string
  enabled: boolean
  failureCount: number

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.name = args.name
    this.url = args.url
    this.enabled = args.enabled
    this.failureCount = args.failureCount
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      enabled: this.enabled,
      failureCount: this.failureCount
    }
  }
}
