// @flow

type ConstructorArgs = {
  id: string,
  name: string,
  token: string,
  active: boolean,
  lastUsedDate: string
}

export default class ApiKey {
  id: string
  name: string
  token: string
  active: boolean
  lastUsedDate: string

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.name = args.name
    this.token = args.token
    this.active = args.active
    this.lastUsedDate = args.lastUsedDate
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      token: this.token,
      active: this.active,
      lastUsedDate: this.lastUsedDate
    }
  }
}
