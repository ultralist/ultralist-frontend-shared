// @flow

import AccountModel from "./account"

type ConstructorArgs = {
  name?: string,
  token?: string,
  email?: string,
  imageUrl?: string,
  uuid?: string,
  status?: string,
  account?: AccountModel
}

export default class User {
  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  status: string
  account: AccountModel

  constructor(args: ConstructorArgs) {
    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.status = args.status || ""
    this.uuid = args.uuid || ""
    this.account = args.account
  }

  toJSON() {
    return {
      name: this.name,
      token: this.token,
      email: this.email,
      uuid: this.uuid,
      status: this.status,
      imageUrl: this.imageUrl,
      account: this.account.toJSON()
    }
  }
}
