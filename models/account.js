// @flow

type ConstructorArgs = {
  status?: string
}

export default class Account {
  status: string

  constructor(args: ConstructorArgs) {
    this.status = args.status || ""
  }

  toJSON() {
    return {
      status: this.status
    }
  }
}
