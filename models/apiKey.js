// @flow

type ConstructorArgs = {
  name: string,
  token: string,
  lastUsedDate: string
}

export default class ApiKey {
  name: string
  token: string
  lastUsedDate: string

  constructor(args: ConstructorArgs) {
    this.name = args.name
    this.token = args.token
    this.lastUsedDate = args.lastUsedDate
  }

  toJSON() {
    return {
      name: this.name,
      token: this.token,
      lastUsedDate: this.lastUsedDate
    }
  }
}
