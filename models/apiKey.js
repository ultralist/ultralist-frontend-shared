// @flow

type ConstructorArgs = {
  id: string,
  name: string,
  token: string,
  lastUsedDate: string
}

export default class ApiKey {
  id: string
  name: string
  token: string
  lastUsedDate: string

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.name = args.name
    this.token = args.token
    this.lastUsedDate = args.lastUsedDate
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      token: this.token,
      lastUsedDate: this.lastUsedDate
    }
  }
}
