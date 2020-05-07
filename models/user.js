// @flow

type ConstructorArgs = {
  name?: string,
  token?: string,
  email?: string,
  imageUrl?: string,
  uuid?: string
}

export default class User {
  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string

  constructor(args: ConstructorArgs) {
    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.uuid = args.uuid || ""
  }

  toJSON() {
    return {
      name: this.name,
      token: this.token,
      email: this.email,
      uuid: this.uuid,
      imageUrl: this.imageUrl
    }
  }
}
